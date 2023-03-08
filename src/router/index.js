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
        component: () => import('@/views/cartgory/sub.vue')

    }, {
        path: '/product/:id',
        component: () => import('@/views/goods/index.vue')
    }]
},
{
    path: '/login',
    component: () => import('@/views/login/index.vue')
}
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
    },

});
export default router;
