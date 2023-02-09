<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>

        <XtxBreadItem
          :to="`/category/sub/${goods.categories[1].id}`"
          v-if="goods"
          >{{ goods.categories[1].name }}</XtxBreadItem
        >

        <XtxBreadItem :to="`/product/${goods.categories[0].id}`" v-if="goods">{{
          goods.categories[0].name
        }}</XtxBreadItem>

        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem v-if="goods">{{ goods.name }}</XtxBreadItem>
        </Transition>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures" />
          <GoodsSales />
        </div>
        <div class="spec"><GoodsName :goods="goods" /></div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from "./components/goods-relevant";
import GoodsImage from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import { findGoods } from "@/api/product";
import { useRoute } from "vue-router";
import { ref } from "vue";
export default {
  name: "XtxGoodsPage",
  components: { GoodsRelevant, GoodsImage, GoodsSales, GoodsName },
  setup() {
    const goods = getGoods();
    console.log(goods);
    return { goods };
  },
};
// 获取接口数据
const getGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  findGoods(route.params.id).then((data) => {
    console.log(data, "44");
    goods.value = data.result;
  });
  return goods;
};
</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>