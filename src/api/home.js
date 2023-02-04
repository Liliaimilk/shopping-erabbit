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

// 获得人气推荐
export const findHot = () => {
    return request('/home/hot', 'get')
}

// 获取商品信息
export const findGoods = () => {
    return request('home/goods', 'get')
}

// 最新专题
export const findSpecial = () => {
    return request('home/special', 'get')
}

// 获取顶级单个分类
export const findTopCategory = (id) => {
    return request('/category', 'get', { id })
}


// 获取id筛选信息
export const findSubCategoryFilter = (id) => {
    return request('/category/sub/filter', 'get', { id })
}