import { userAccountLogin } from "@/api/user"
export default {
    namespaced: true,
    state() {
        return {
            profile: {}
        }
    },
    mutations: {
        setName(state, payload) {
            state.profile = payload;
        }
    },
    actions: {
        // 登录
        async login({ commit }, payload) {
            const data = await userAccountLogin(payload);
            console.log(data);
            commit('setName', data.result)
        }
    }
}