//1.引入axios依赖包
import axios from "axios";
import {useUserStore} from "@/store/user"
//2.axios创建对象
const request = axios.create({
    baseURL:"https://api.shop.eduwork.cn/",//管理后台要使用的接口地址
    timeout:8000,//超时时间
});





//3.定义前置拦截器，请求拦截器，请求发送出去之前触发
request.interceptors.request.use((config)=>{
    const useStore = useUserStore();
    config.headers.Authorization = `Bearer ${useStore.getToken||''}`;
    //config 接口请求配置信息
    return config;
},(error)=>{
    //报错的时候抛出一个错误信息
    return Promise.reject(error);
});
//4.定义响应拦截器
request.interceptors.response.use((response)=>{
    //响应回来的数据操作
    //404 请求资源不存在
    //502 服务器端口错误
    //401 没有权限
    return response.data;
},(error)=>{
    //报错的时候抛出一个错误信息
    return Promise.reject(error);
});

//5.抛出对象信息
export default request;
