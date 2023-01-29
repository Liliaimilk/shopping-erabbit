<template>
  <div class="home-product" ref="target">
    <HomePanel :title="item.name" v-for="item in goods" :key="item.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{
            sub.name
          }}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-lazy="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="i in item.goods" :key="i">
            <!-- 明日填充goods组件 -->
            <HomeGoods :goodsInfo="i" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { findGoods } from "@/api/home";
// import { ref } from "vue";
import HomeGoods from "./home-goods.vue";
import HomePanel from "./home-panel.vue";
import { useLazyData } from "@/hooks";
export default {
  name: "HomeProduct",
  components: {
    HomeGoods,
    HomePanel,
  },
  setup() {
    // const result = ref([]);
    // findGoods().then((data) => {
    //   console.log(data.result, "29");
    //   result.value = data.result;
    // });
    // 组件懒加载
    const { target, goods } = useLazyData(findGoods);
    return { goods, target };
  },
};
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>