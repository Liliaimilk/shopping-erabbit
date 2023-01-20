import { createRouter, createWebHashHistory } from "vue-router";
// 懒加载
const HomePage = () => import("@/views/home");
const AppPage = () => import("@/views/Layout.vue")
const routes = [{
    path: '/',
    component: AppPage,
    children: [{
        path: '/',
        component: HomePage
    }]
}];
const router = createRouter({
    history: createWebHashHistory(),
    routes

});
export default router;
