import request from '@/utils/request';

export function login(data:Object){
    return request<{access_token:string},{access_token:string}>(
        {
            url:'/api/auth/login',
            method:'POST',
            data,
    }
    )
}

type userdate = {
[x: string]: any;
    avatar:string;
    name:string;
} 
export function user(){
    return request<userdate,userdate>({
        url:'/api/admin/user',
        method:'GET',
    })
}
export function logout(){
    return request (
        {
        url:'/api/auth/logout',
        method:'POST',
        }
    )
}