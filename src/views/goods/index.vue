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
        <div class="spec">
          <GoodsName :goods="goods" />
          <!-- 规格组件 -->
          <GoodsSku :skuData="goods" />
          <!-- 计数 -->
          <XtxNumbox> </XtxNumbox>
          <XtxButton type="primary">加入购物车</XtxButton>
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :id="goods.id" :isNumber="1" />
          <GoodsHot :id="goods.id" :isNumber="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsTabs from "./components/goods-tabs.vue";
import GoodsRelevant from "./components/goods-relevant";
import GoodsImage from "./components/goods-image.vue";
import GoodsSales from "./components/goods-sales.vue";
import GoodsName from "./components/goods-name.vue";
import GoodsSku from "./components/goods-sku.vue";
import GoodsHot from "./components/goods-hot.vue";
import { findGoods } from "@/api/product";
import { useRoute } from "vue-router";
import { provide, ref } from "vue";
export default {
  name: "XtxGoodsPage",
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
  },
  setup() {
    const goods = getGoods();
    console.log(goods);
    provide("goods", goods);
    return { goods };
  },
};
// 获取接口数据
const getGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  // sku固定id"1369155859933827074"
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

// 同类商品推荐
::v-deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>