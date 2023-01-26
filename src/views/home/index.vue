<template>
  <div class="home-enter">
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
  </div>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
export default {
  name: "AppIndex",
  components: {
    HomeCategory,
    HomeBanner,
  },
};
</script>

<style lang="less" scoped>
.home-enter {
  height: 500px;
}
</style>