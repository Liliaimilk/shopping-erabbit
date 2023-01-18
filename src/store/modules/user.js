export default {
    namespaced: true,
    state() {
        return {
            profile: {
                name: 'lili',
                age: 19,
                sex: '男'
            }
        }
    },
    mutations: {
        setName(state, payload) {
            state.profile.name = payload;
        }
    }
}