// 封装插件
// import XtxSkeleton from "@/components/library/xtx-skeleton.vue"
// import XtxCarousel from "@/components/library/xtx-carousel.vue"
// import XtxMore from "@/components/library/xtx-more.vue"
import defaultImg from "@/assets/images/qrcode.jpg"
import Message from './message'
// import XtxBread from "@/components/library/xtx-bread.vue"
// import XtxBreadItem from "@/components/library/xtx-bread-item.vue"
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
export default {
    install(app) {
        // app.component(XtxSkeleton.name, XtxSkeleton);
        // app.component(XtxCarousel.name, XtxCarousel);
        // app.component(XtxMore.name, XtxMore)
        // app.component(XtxBread.name, XtxBread)
        // app.component(XtxBreadItem.name, XtxBreadItem)

        // 自动批量注册组件 require.context()是webpack自动导入的一个api
        const importFn = require.context('./', false, /\.vue$/);
        importFn.keys().forEach((item) => {
            const component = importFn(item).default;
            app.component(component.name, component)
            // console.log(component, '22');
        })
        // 自定义指令
        defineDirective(app);

        // /如果你想挂载全局的属性，能够通过组件实例调用的属性   this.$message
        app.config.globalProperties.$message = Message// 原型函数
    }
}

const defineDirective = app => {
    // 图片懒加载指令
    app.directive('lazy', {
        // el为指令所绑定的元素，直接操作dom
        // binding为一个对象包含多种属性，如value为指令绑定的值，name为指令名
        mounted(el, binding) {
            // intersectionObserver函数
            const observer = new IntersectionObserver(([{ isIntersecting }]) => {
                if (isIntersecting) {
                    observer.unobserve(el);
                    // 图片出错
                    el.onerror = () => {
                        el.src = defaultImg;
                    }
                    el.src = binding.value;

                }
            },
                {
                    threshold: 0.01
                })
            // 继续监听
            observer.observe(el)
        }
    })
}