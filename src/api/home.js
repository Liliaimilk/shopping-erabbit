import request from "@/utils/request"
// 品牌
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit })
}

// 轮播banner图
export const findBanner = () => {
    return request('/home/banner', 'get')
}

// 获取新鲜好物
export const findNew = () => {
    return request('/home/new', 'get')
}