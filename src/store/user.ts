import {defineStore} from 'pinia';
import {login,user} from '@/api/auth';

export interface IUserState{
    token:string;
    username:string;
    avatar_url:string;
    permissions:string[];
    info:Object;
}
export const useUserStore = defineStore({
    id:'app-user',
    state:():IUserState=>({
        token:localStorage.getItem('token')||'',
        username:'',
        avatar_url:'',
        permissions:[],
        info:{},
    }),
    getters:{
        getToken():string{
            return this.token;
        },
        getAvatar():string{
            return this.avatar_url;
        },
        getUserName():string{
            return this.username;
        },
        getPermissions():string[]{
            return this.permissions;
        },
        getUserInfo():Object{
            // if (!this.info?.id) {   
            // }
            return this.info;
        }
    },
    actions:{
        setUserName(name:string){
            this.username=name;
        },
        setToken(token:string){
            localStorage.setItem('token',token);
            this.token = token;
        },
        setAvatar(avatar:string){
            this.avatar_url = avatar;
        },
        setUserInfo(info:Object){
            this.info = info;
        },
        setPerMissions(permissions:string[]){
            this.permissions = permissions;
        },
        async login(userInfo:Object){
            try{
                const response = await login(userInfo);
                if(response.access_token){
                    this.setToken(response.access_token);
                    this.getUser();
                }
            } catch(error){ 
                return Promise.reject(error);
            }
        },
        async getUser(){
            try {
                const response = await user();
                const aaa = {
                    user:response,
                    url:response.avatar_url,
                    name:response.name,
                };
                const a = JSON.stringify(aaa);
                localStorage.setItem('user', a);
                return response;
            } catch (error) {
                console.log(error);
            }
        }
    }
})