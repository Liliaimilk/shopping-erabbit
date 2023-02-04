<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread> </SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 排序区 -->
      <div class="goods-list">
        <SubSort></SubSort>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import SubSort from "./components/sub-sort.vue";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
export default {
  name: "SubCartgory",
  components: {
    SubBread,
    SubFilter,
    SubSort,
  },
  setup() {},
};
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>