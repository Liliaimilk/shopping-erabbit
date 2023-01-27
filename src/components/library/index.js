// 封装插件
import XtxSkeleton from "@/components/library/xtx-skeleton.vue"
import XtxCarousel from "@/components/library/xtx-carousel.vue"
import XtxMore from "@/components/library/xtx-more.vue"
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展
export default {
    install(app) {
        app.component(XtxSkeleton.name, XtxSkeleton);
        app.component(XtxCarousel.name, XtxCarousel);
        app.component(XtxMore.name, XtxMore)
    }
}