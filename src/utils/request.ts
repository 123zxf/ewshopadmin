//1.引入axios依赖包
import axios from "axios";
//2.axios创建对象
const request = axios.create({
    baseURL:"https://api.shop.eduwork.cn/",//管理后台要使用的接口地址
    timeout:8000,//超时时间
});





//3.定义前置拦截器，请求拦截器，请求发送出去之前触发
request.interceptors.request.use((config)=>{
    //config接口请求的配置信息
    //1.获取token
    const token = localStorage.getItem("token");
    //2.判断token是否存在
    if  (token){
        //3.如果存在，添加到请求头参数中
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    // const useStore = useUserStore();
    // config.headers.Authorization = `Bearer ${useStore.getToken||''}`;
    //config 接口请求配置信息
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
    const {response} = error;
    switch(response.status){
        case 401:
            window.$message.error('登录失效请重新登录');
            localStorage.removeItem('token');
            setTimeout(()=>{
                window.location.href = '/login';
            },5000)
            break;
        case 404:
            window.$message.error('访问不存在');
            break;
        case 500:
        case 502:
            window.$message.error('网络异常');
            break;
        case 422:
            window.$message.error('参数错误');
            break;
    }
    //报错的时候抛出一个错误信息
    return Promise.reject(error);
});

//5.抛出对象信息
export default request;
