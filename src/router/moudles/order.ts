import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue';
import {renderIcon} from '@/utils';
import {JournalOutline, Person,PersonCircleOutline} from '@vicons/ionicons5';

const routeName = 'order';

const routes: RouteRecordRaw[] = [
    {
        path: '/order',
        name: routeName,
        component: Layout,
        redirect:'/order',
        meta: {
            title: '财务管理',
            icon: renderIcon(JournalOutline),
            sort:2
        },
        children: [
            {
                path: 'list',
                name: `${routeName}_list`,
                component: ()=>import('@/views/order/index.vue'),
                meta: {
                    title: '订单列表',
                    icon: renderIcon(Person),
                }
            },
            {
                path: 'refund',
                name: `${routeName}_refund`,
                component: ()=>import('@/views/order/refund.vue'),
                meta: {
                    title: '退款列表',
                    icon: renderIcon(PersonCircleOutline),
                }
            }
           
        ]
    }
];
export default routes;