import request from "@/utils/request";

// 获取所有二级分类
export const findAllCartgory = () => {
    return request('/home/category/head', 'get')
}

/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
export const findSubCategoryGoods = (params) => {
    return request('/category/goods/temporary', 'post', params)
}

