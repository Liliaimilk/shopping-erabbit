// 组件数据懒加载 使用vueuse的useIntesectionObserver方法
import { useIntersectionObserver } from "@vueuse/core"
import { ref } from "vue"
export const useLazyData = (apiFn) => {
    const target = ref(null);
    const goods = ref([]);
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        if (isIntersecting) {
            stop();
            // 接口函数
            apiFn().then(data => {
                goods.value = data.result;
            })

        }
    },
        {
            threshold: 0.1
        });

    return { goods, target }

}