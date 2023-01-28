<template>
  <HomePanel title="热门品牌" subTitle="国际经典" subtwoTitle="品质保证">
    <template v-slot:right>
      <a
        href="javascript:;"
        class="iconfont icon-angle-left prev"
        @click="next(0)"
        :class="{ disabled: count == 0 }"
      ></a>
      <a
        href="javascript:;"
        class="iconfont icon-angle-right next"
        @click="next(1)"
        :class="{ disabled: count == 1 }"
      ></a>
    </template>
    <div class="box" ref="box">
      <Transition name="fade">
        <ul
          class="list"
          v-if="goods.length"
          :style="{
            transform: `translateX(${-count * 1240}px)`,
          }"
        >
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          +
          <XtxSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          />
          +
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from "./home-panel";
// import HomeSkeleton from "./home-skeleton.vue";
import { findBrand } from "@/api/home";
import { useLazyData } from "@/hooks";
import { ref } from "vue";
export default {
  name: "HomeBrand",
  components: { HomePanel },
  setup() {
    // const goods = ref([]);
    const count = ref(0);
    // findBrand().then((data) => {
    //   console.log(data.result, "31");
    //   goods.value = data.result;
    // });

    // 数据懒加载 当接口需传入数据时应用箭头函数 因为需要一个api函数 而不是一个promise对象
    const { target, goods } = useLazyData(() => findBrand(10));

    // 切换
    const next = (data) => {
      count.value = data;
    };
    return { goods, next, count, box: target };
  },
};
</script>

<style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .skeleton {
    width: 100%;
    display: flex;
    .item {
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .list {
    width: 200%;
    display: flex;
    // transform: translateX(-1240px);
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
