import { findAllCartgory } from "@/api/cartgory"
import { toCartData } from "@/api/constants"
export default {
    namespaced: true,
    state() {
        return {
            list: toCartData.map(item => ({ name: item }))
        }
    },
    mutations: {
        cartgoryMsg(state, payload) {
            state.list = payload
        },
        hide(state, item) {
            const hide = state.list.find(sub => sub.id === item.id);
            hide.open = false;
        },
        show(state, item) {
            const show = state.list.find(sub => sub.id === item.id);
            show.open = true
        }
    },
    actions: {
        async getAllCartgory({ commit }) {
            const data = await findAllCartgory();
            // 给每个分类加上控制二级分类显示隐藏的数据
            data.result.forEach(top => {
                top.open = false
            })
            console.log(data.result, '17');

            commit('cartgoryMsg', data.result)
        }
    }
}