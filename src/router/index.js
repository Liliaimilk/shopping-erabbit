import { createRouter, createWebHashHistory } from "vue-router";
// 懒加载
const HomePage = () => import("@/views/home");
const AppPage = () => import("@/views/Layout.vue");
const TopCartgory = () => import('@/views/cartgory/index.vue')
const routes = [{
    path: '/',
    component: AppPage,
    children: [{
        path: '/',
        component: HomePage
    }, {
        path: '/category/:id',
        component: TopCartgory
    }, {
        path: '/category/sub/:id',
        component: import('@/views/cartgory/sub.vue')

    }]
}];
const router = createRouter({
    history: createWebHashHistory(),
    routes

});
export default router;
