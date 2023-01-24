<template>
  <TopNav />
  <AppHeaderSticky />
  <AppHeader />
  <!-- 二级路由 -->
  <Router-view />
  <AppFooter />
</template>

<script>
import TopNav from "../components/app-topnav.vue";
import AppHeader from "../components/app-headers.vue";
import AppFooter from "@/components/app-footers.vue";
import AppHeaderSticky from "@/components/app-header-sticky.vue";
import { useStore } from "vuex";
export default {
  name: "AppPage",
  components: {
    TopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky,
  },
  setup() {
    const store = useStore();
    store.dispatch("cartgory/getAllCartgory");
  },
};
</script>

<style lang="less" scoped>
// @import "../assets/style/mixins.less";
.cainter {
  .hoverShadow();
}
</style>