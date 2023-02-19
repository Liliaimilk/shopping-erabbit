<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: isActive === 'detail' }"
        href="javascript:;"
        @click="changeStatus('detail')"
        >商品详情</a
      >
      <a
        href="javascript:;"
        :class="{ active: isActive === 'comment' }"
        @click="changeStatus('comment')"
        >商品评价<span>(500+)</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <GoodsDetail v-if="isActive === 'detail'" />
    <GoodsComment v-else />
  </div>
</template>

<script>
import { ref } from "vue";
import GoodsDetail from "./goods-detail.vue";
import GoodsComment from "./goods-coment.vue";
export default {
  name: "GoodsTabs",
  components: {
    GoodsDetail,
    GoodsComment,
  },
  setup() {
    const isActive = ref("detail");
    const changeStatus = (ctt) => {
      isActive.value = ctt;
    };
    return { isActive, changeStatus };
  },
};
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>