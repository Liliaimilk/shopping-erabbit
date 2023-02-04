<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <Transition name="fade-right" mode="out-in">
          <XtxBreadItem :to="`/category/${subList.id}`" :key="subList.id">{{
            subList.name
          }}</XtxBreadItem>
        </Transition>
      </XtxBread>

      <!-- 轮播图 -->
      <XtxCarousel :imgInfo="sliders" style="height: 500px" auto-play />

      <!-- 二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in subList.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>

      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">温柔之选，品质保证</p>
          <XtxMore :path="`/category/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="sub in item.goods" :key="sub" :goodsInfo="sub" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner, findTopCategory } from "@/api/home";
// import { useStore } from "vuex";
import { useRoute } from "vue-router";
import GoodsItem from "./components/goods-item.vue";
import { ref, watch } from "vue";
export default {
  name: "TopCartgory",
  components: {
    GoodsItem,
  },
  setup() {
    // const store = useStore();
    const route = useRoute();
    // 轮播图
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });

    // 面包屑
    const subList = ref([]);
    // 监听id变化，实现页面跳转时渲染
    watch(
      () => route.params.id,
      (newVal) => {
        // 获取顶级单个分类 并判断当前id是否与页面一致
        if (`/category/${newVal}` === route.path) {
          findTopCategory(newVal).then((data) => {
            // console.log(data, "66");
            subList.value = data.result;
          });
        }
      },
      { immediate: true }
    );
    return { sliders, subList };
  },
};
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>