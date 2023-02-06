export default {
    namespaced: true,
    state() {
        return {
            profile: {
                id: '',
                avatar: '',
                nickname: '',
                account: '',
                mobile: '',
                token: ''
            }
        }
    },
    mutations: {
        setName(state, payload) {
            state.profile.name = payload;
        }
    }
}