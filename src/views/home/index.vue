<template>
  <div class="home-enter">
    <div class="container">
      <!-- 首页分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- 面板 -->
      <HomeNew />
      <!-- 人气推荐 -->
      <HomeHot />
      <!-- 热门品牌 -->
      <HomeBrand />
      <!-- 商品板块 -->
      <HomeProduct />
      <!-- 最新专题 -->
      <HomeSpecial />
    </div>
  </div>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import HomeBrand from "./components/home-brand.vue";
import HomeProduct from "./components/home-product.vue";
import HomeSpecial from "./components/home-special.vue";
export default {
  name: "AppIndex",
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial,
  },
};
</script>

<style lang="less" scoped>
</style>