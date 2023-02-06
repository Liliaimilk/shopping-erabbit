import axios from "axios";
import { Promise } from "core-js";
import store from "@/store"
const instance = axios.create({
    baseURL: 'https://apipc-xiaotuxian-front.itheima.net/',
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    // 1.获取用户信息

    // eslint-disable-next-line no-constant-condition
    const { profile } = store.state.user
    // 2. 判断是否有token
    if (profile.token) {
        // 3. 设置token
        config.headers.Authorization = `Bearer ${profile.token}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


// 响应拦截

instance.interceptors.response.use((response) => {

    return response.data
}, (error) => {
    if (error.response && error.response.status === 401) {
        // 清除无效用户信息

        // 返回登录页
        store.commit('user/setUser', {})
        // 获取传递参数
    }
    return Promise.reject(error);
})

export default (url, method, submitData) => {
    return instance({
        url,
        method,
        // 如果请求方式是get，则用params传输数据
        // 如果是其他的传输方式则用data传输数据
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}