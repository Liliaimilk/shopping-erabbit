import { userAccountLogin, userMobileLogin } from "@/api/user"
import Message from "@/components/library/message"
export default {
    namespaced: true,
    state() {
        return {
            isMsgLogin: null,
            profile: {}
        }
    },
    mutations: {
        setName(state, payload) {
            state.profile = payload;
        },
        setIsMsgLogin(state, payload) {
            state.isMsgLogin = payload
        }
    },
    actions: {
        // 登录
        async login(context, payload) {
            try {
                let data = {};
                if (context.state.isMsgLogin) {
                    data = await userMobileLogin(payload);
                } else {
                    data = await userAccountLogin(payload);
                }
                // console.log(data);
                context.commit('setName', data.result)
                Message({ type: 'success', text: '登录成功' })
                // 跳转路由
                this.$router.push(this.$route.query.redirectUrl || '/')
            } catch (error) {
                console.log(error);
                if (error.response.status === 400) {
                    Message({ type: "error", text: "请输入正确的用户名或密码" });
                } else {
                    new Error("登录错误！")
                }
            }
        }
    }
}