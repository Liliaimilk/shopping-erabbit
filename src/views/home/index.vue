<template>
  <div class="home-enter">
    <HomeCategory />
  </div>
</template>

<script>
import HomeCategory from "./components/home-category.vue";
export default {
  name: "AppIndex",
  components: {
    HomeCategory,
  },
};
</script>

<style lang="less" scoped>
.home-enter {
  height: 500px;
}
</style>