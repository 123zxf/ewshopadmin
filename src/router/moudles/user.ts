import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue';
import {renderIcon} from '@/utils';
import {Body,PersonCircleOutline,PersonCircleSharp} from '@vicons/ionicons5';

const routeName = 'users';

const routes: RouteRecordRaw[] = [
    {
        path: '/users',
        name: routeName,
        component: Layout,
        redirect:'/users/list',
        meta: {
            title: '用户管理',
            icon: renderIcon(Body),
            sort:1
        },
        children: [
            {
                path: 'list',
                name: `${routeName}_list`,
                component: ()=>import('@/views/user/index.vue'),
                meta: {
                    title: '用户列表',
                    icon: renderIcon(PersonCircleOutline),
                }
            },
            {
                path: 'message',
                name: `${routeName}_message`,
                component: ()=>import('@/views/user/usermessage.vue'),
                meta: {
                    title: '用户信息',
                    icon: renderIcon(PersonCircleSharp),
                }
            }
        ]
    }
];
export default routes;