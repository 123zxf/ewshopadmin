<template>
    <div class="pt-4">
        <div class="m-0">
            <img class="m-auto" src="@/assets/images/logo.png" alt="logo">
        </div>
        <n-menu :inverted="true" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
            @update-value="selectMenu" >
        </n-menu>
    </div>
</template>
<script lang="ts" setup>
import { generatorMenu } from '@/utils';
import {useRouter } from 'vue-router';
import {routeModuleList} from '@/router/index';
const router = useRouter();


// const menuOptions = ref<MenuOption[]>([
//     {
//         label: () =>
//             h(
//                 RouterLink,
//                 {
//                     to: {
//                         name: 'dashboard_console'
//                     }
//                 },
//                 { default: () => '控制台' }
//             ),
//         key: '/dashboard/console',
//         icon: renderIcon(HomeIcon),
//     },
//     {
//         label: () =>
//             h(
//                 RouterLink,
//                 {
//                     to: {
//                         name: 'users_list'
//                     }
//                 },
//                 { default: () => '用户列表' }
//             ),
//         key: '/users/list',
//         icon: renderIcon(PersonIcon)
//     },
//     {
//         label: "订单查询",
//         key: '/order/list',
//         icon: renderIcon(WineIcon),
//         children: [
//             {
//                 label: () =>
//             h(
//                 RouterLink,
//                 {
//                     to: {
//                         name: 'order_list'
//                     }
//                 },
//                 { default: () => '订单列表' }
//             ),
//                 key: '/order/list',
//                 icon:renderIcon(BookIcon),
//             },
//             {
//                 label: () =>
//             h(
//                 RouterLink,
//                 {
//                     to: {
//                         name: 'order_refund'
//                     }
//                 },
//                 { default: () => '退款列表' }
//             ),
//                 key: '/order/refund',
//                 icon:renderIcon(AlertCircleOutline)
//             }
//         ]
//     },
// ]);
const menuOptions = generatorMenu(routeModuleList);

const selectMenu = (key:string,item:object) => {
    console.log(selectMenu);
    console.log(key);
    console.log(item);
    router.push({name:key});
}

</script>