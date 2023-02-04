<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="subFilterData && !loading">
    <div class="item">
      <div class="head">品牌:</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="item in subFilterData.brands"
          :key="item.id"
          :class="{ active: subFilterData.selectBrands === item.id }"
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="top in subFilterData.saleProperties" :key="top.id">
      <div class="head">{{ top.name }}:</div>
      <div class="body">
        <a
          href="javascript:;"
          v-for="sub in top.properties"
          :key="sub.id"
          :class="{ active: subFilterData.selectSub === sub.id }"
          >{{ sub.name }}</a
        >
      </div>
    </div>
  </div>
  <!-- 骨架屏 -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { findSubCategoryFilter } from "@/api/home";
import { ref, watch } from "vue";
export default {
  name: "SubFilter",
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const subFilterData = ref(null);
    // 监听id变化
    watch(
      () => route.params.id,
      (newVal) => {
        // 判断id是否一致
        if (newVal && route.path === `/category/sub/${newVal}`) {
          loading.value = true;
          findSubCategoryFilter(route.params.id).then((data) => {
            // 添加数据
            data.result.selectBrands = null;
            data.result.brands.unshift({ id: null, name: "全部" });
            data.result.selectSub = null;
            data.result.saleProperties.forEach((item) => {
              item.properties.unshift({ id: null, name: "全部" });
            });
            subFilterData.value = data.result;
            loading.value = false;
            console.log(data.result);
          });
        }
      },
      { immediate: true }
    );
    return { subFilterData, loading };
  },
};
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>