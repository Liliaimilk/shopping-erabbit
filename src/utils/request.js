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

    // 2.判断是否有token
    // eslint-disable-next-line no-constant-condition
    if (1) {
        config.headers.Authorization = `Bearer ${1}`
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})


// 响应拦截

instance.interceptors.response.use((response) => {
    if (response.status == 401) {
        // 清除无效用户信息

        // 返回登录页
        store.commit('user/setUser', {})
        // 获取传递参数
    }
    return response.data
}, (error) => {
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