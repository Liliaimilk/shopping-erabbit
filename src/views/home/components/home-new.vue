<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉" subtwoTitle="品质靠谱">
      <template v-slot:right>
        <XtxMore />
      </template>
      <!-- 面板内容 -->
      <Transition name="fade" ref="target">
        <ul class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="price">&yen;{{ item.price }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </Transition>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from "./home-panel.vue";
import { useLazyData } from "@/hooks";
import HomeSkeleton from "./home-skeleton.vue";
import { findNew } from "@/api/home";
// import { ref } from "vue";
export default {
  name: "HomeNew",
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    // const goods = ref([]);
    // findNew().then((data) => {
    //   //   console.log(data, "33");
    //   goods.value = data.result;
    // });
    // 组件数据懒加载
    const { target, goods } = useLazyData(findNew);
    return { goods, target };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>