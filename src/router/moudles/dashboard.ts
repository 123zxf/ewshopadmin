import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue';
import {Browsers} from '@vicons/ionicons5';
import { renderIcon } from '@/utils';

const routeName = 'dashboard';

/**
 * @param name  路由名称，必须设置，且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址，访问这个路由时，自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort
 */

const routes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: routeName,
        component: Layout,
        redirect:'/dashboard/console',
        meta: {
            title: 'Dashboard',
            icon: renderIcon(Browsers),
            sort:0
        },
        children: [
            {
                path: 'console',
                name: `${routeName}_console`,
                component: ()=>import('@/views/dashboard/index.vue'),
                meta: {
                    title: '主控台',
                    icon: renderIcon(Browsers),
                }
            }
        ]
    }
];
export default routes;