<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" subTitle="人气爆款" subtwoTitle="不容错过">
      <Transition name="fade" ref="target">
        <ul class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else bg="#f0f9f4" />
      </Transition>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue";
import { findHot } from "@/api/home";
import { useLazyData } from "@/hooks";
// import { ref } from "vue";
export default {
  name: "HomeHot",
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    // const goods = ref([]);
    // findHot().then((data) => {
    //   goods.value = data.result;
    // });
    // 数据懒加载
    const { target, goods } = useLazyData(findHot);
    return { goods, target };
  },
};
</script>

<style lang='less' scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>