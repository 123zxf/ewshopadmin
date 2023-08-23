import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";


const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'Login', component: Login, meta: { title: '登录' } },
]
const modules = import.meta.glob('./moudles/**/*.ts', { eager: true, import: 'default' });
const routeModuleList:RouteRecordRaw[] = [];
Object.keys(modules).forEach((key)=>{
    const mod = modules[key] || {};
    const modList = Array.isArray(mod)?[...mod]:[mod];
    routeModuleList.push(...modList); 
});
const baseRoutes = [...routes,...routeModuleList];

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes: baseRoutes, // `routes: routes` 的缩写
})
router.beforeEach((to) => {
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
export default router;
export {routeModuleList}