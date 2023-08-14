import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import dashboard from "@/router/moudles/dashboard.ts";

// const routes = {...}
// console.log(baseRoutes);
const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'Login', component: Login, meta: { title: '登录' } },
    // { path: '/dashboard', name:'dashboard',component: Dashboard,meta: { title: '首页' } },
]
const baseRoutes = [...routes, ...dashboard];

export const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes: baseRoutes, // `routes: routes` 的缩写
})
router.beforeEach((to) => {
    console.log("0");
    document.title = (to?.meta?.title as string) || document.title;
    if (to.name != 'Login') {
        if (!localStorage.getItem('token')) {
            return {
                path: '/login',
                query: {
                    redirect: to.fullPath,
                }
            }
        }
    }
})