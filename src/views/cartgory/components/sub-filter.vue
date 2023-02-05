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
          @click="changeBrands(item.id)"
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
          :class="{ active: top.selectSub === sub.id }"
          @click="changeFilter(top.id, sub.id)"
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
  emits: ["changeFn"],
  setup(props, { emit }) {
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
            data.result.saleProperties.forEach((item) => {
              item.selectSub = null;
              item.properties.unshift({ id: null, name: "全部" });
            });
            subFilterData.value = data.result;
            loading.value = false;
            // console.log(data.result, "66");
          });
        }
      },
      { immediate: true }
    );

    // 获取筛选区选中条件
    const getFilterParams = () => {
      const brandsData = {};
      const filterData = [];
      // 品牌id放入
      brandsData.brandId = subFilterData.value.selectBrands;
      // 销售属性name和属性name放入
      subFilterData.value.saleProperties.forEach((item) => {
        if (item.selectSub) {
          const attrs = item.properties.find(
            (sub) => sub.id === item.selectSub
          );
          filterData.push({ groupName: item.name, propertyName: attrs.name });
        }
        // console.log(filterData, "88");
      });
      if (filterData.length) {
        brandsData.attrs = filterData;
        console.log(brandsData, "92");
      }
      return brandsData;
    };

    //品牌选择样式
    const changeBrands = (item) => {
      subFilterData.value.selectBrands = item;
      emit("changeFn", getFilterParams());
    };

    // 筛选选中样式
    const changeFilter = (item, sub) => {
      subFilterData.value.saleProperties.forEach((i) => {
        if (i.id === item) {
          i.selectSub = sub;
        }
      });
      console.log("1");
      emit("changeFn", getFilterParams());
    };
    return {
      subFilterData,
      loading,
      changeBrands,
      changeFilter,
    };
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