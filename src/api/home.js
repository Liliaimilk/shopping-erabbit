import request from "@/utils/request"
// 品牌
export const findBrand = (limit) => {
    return request('/home/brand', 'get', { limit })
}

// 轮播banner图
export const findBanner = () => {
    return request('/home/banner', 'get')
}