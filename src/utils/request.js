import axios from "axios";
import { Promise } from "core-js";
const instance = axios.create({
    baseURL: '',
    timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use((config) => {
    // 1.获取用户信息

    // 2.判断是否有token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
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

        // 获取传递参数
    }
}, (error) => {
    return Promise.reject(error);
})