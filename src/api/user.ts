import request from '@/utils/request';

/**
 * @description:用户列表
 * @param params 
 */
export function users(params:any){
    return request(
        {
        url:'/api/admin/users',
        method:'GET',
        params,
        }
    );
}
export function addUser(data:any){
    return request({
        url:'/api/admin/users',
        method:'POST',
        data,
    })
}