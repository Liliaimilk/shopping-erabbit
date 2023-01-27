<template>
  <div class="home-enter">
    <div class="container">
      <!-- 首页分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
      <!-- 面板 -->
      <HomePanel title="新鲜好物" subTitle="新鲜出炉" subtwoTitle="品质靠谱">
        <template v-slot:right>
          <XtxMore />
        </template>
        <!-- 面板内容 -->
      </HomePanel>
    </div>
  </div>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomePanel from "./components/home-panel.vue";
export default {
  name: "AppIndex",
  components: {
    HomeCategory,
    HomeBanner,
    HomePanel,
  },
};
</script>

<style lang="less" scoped>
.home-enter {
  height: 500px;
}
</style>