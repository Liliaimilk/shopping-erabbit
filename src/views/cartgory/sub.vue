<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread> </SubBread>
      <!-- 筛选区 -->
      <SubFilter @changeFn="getSaleData"></SubFilter>
      <!-- 排序区 -->
      <div class="goods-list">
        <SubSort @subSort="getSortParams"></SubSort>
        <ul>
          <li v-for="item in goodsInfo" :key="item.id">
            <GoodsItem :goodsInfo="item"></GoodsItem>
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading
          @infinite="getGoodsData()"
          :loading="loading"
          :finished="finished"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
import SubSort from "./components/sub-sort.vue";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import GoodsItem from "./components/goods-item.vue";
import { findSubCategoryGoods } from "@/api/cartgory";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "SubCartgory",
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem,
  },
  setup() {
    const route = useRoute();
    const loading = ref(false);
    const finished = ref(false);
    const goodsInfo = ref([]);
    let reqParams = {
      page: 1,
      pageSize: 20,
    };

    // 获取goods-item信息
    const getGoodsData = () => {
      loading.value = true;
      if (route.path === `/category/sub/${route.params.id}`) {
        reqParams.categoryId = route.params.id;
        findSubCategoryGoods(reqParams).then((data) => {
          // console.log(data, "51");
          if (data.result.items.length) {
            goodsInfo.value.push(...data.result.items);
            reqParams.page++;
            // console.log(reqParams.page, "64");
          } else {
            finished.value = true;
          }
        });
        loading.value = false;
      }
    };

    // 切换二级页面，重新获取数据
    watch(
      () => route.params.id,
      (newVal) => {
        route.params.id = newVal;
        goodsInfo.value = [];
        reqParams.page = 1;
        finished.value = false;
        getGoodsData();
      }
    );

    // 排序条件 合并获取条件 将得到得排序条件 与上条件合并 再重新获取数据
    const getSortParams = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams };
      // 将条件生效前的获取数据直接清空
      goodsInfo.value = [];
      finished.value = false;
      reqParams.page = 1;
      getGoodsData();
    };

    // 销售属性条件合并
    const getSaleData = (item) => {
      goodsInfo.value = [];
      finished.value = false;
      reqParams.page = 1;
      console.log(item, "100");
      reqParams = { ...reqParams, ...item };
      getGoodsData();
    };
    return {
      getGoodsData,
      goodsInfo,
      finished,
      loading,
      getSortParams,
      getSaleData,
    };
  },
};
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>