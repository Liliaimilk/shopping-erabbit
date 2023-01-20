<template>
  <TopNav />
  <AppHeader />
  <!-- 二级路由 -->
  <Router-view />
</template>

<script>
import TopNav from "../components/app-topnav.vue";
import AppHeader from "../components/app-headers.vue";
export default {
  name: "AppPage",
  components: {
    TopNav,
    AppHeader,
  },
};
</script>

<style lang="less" scoped>
// @import "../assets/style/mixins.less";
.cainter {
  .hoverShadow();
}
</style>