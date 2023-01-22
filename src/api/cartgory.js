import request from "@/utils/request";

// 获取所有二级分类
export const findAllCartgory = () => {
    return request('/home/category/head', 'get')
}