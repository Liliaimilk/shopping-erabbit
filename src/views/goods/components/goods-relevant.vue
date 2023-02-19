<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :imgInfo="goods" />
  </div>
</template>

<script>
import { ref } from "vue";
import { findRelGoods } from "@/api/good";
export default {
  // 同类推荐，猜你喜欢
  name: "GoodsRelevant",
  props: {
    goodsId: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const goods = ref([]);
    // 每页四条处理数据
    findRelGoods(props.goodsId).then((data) => {
      const size = 4;
      const total = Math.ceil(data.result.length / size);
      for (let i = 0; i < total; i++) {
        goods.value.push(data.result.slice(i * size, (i + 1) * size));
      }
      console.log(goods.value);
    });
    return { goods };
  },
};
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
}
</style>
