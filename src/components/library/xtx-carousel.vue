<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body" v-if="imgInfo">
      <li
        class="carousel-item"
        v-for="(item, ind) in imgInfo"
        :key="ind"
        :class="{ fade: index == ind }"
      >
        <RouterLink to="/" v-if="item.imgUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>

        <!-- 同类商品推荐轮播图 -->
        <div class="slider" v-else>
          <RouterLink to="/" v-for="sub in item" :key="sub.id">
            <img :src="sub.picture" alt="" />
            <p class="name ellipsis">{{ sub.desc }}</p>
            <p class="price">{{ sub.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="next(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="next(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        v-for="(item, ind) in imgInfo"
        :key="ind"
        :class="{ active: index == ind }"
        @click="index = ind"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "XtxCarousel",
  props: {
    imgInfo: {
      type: Array,
      default: () => [],
    },
    duration: {
      type: Number,
      default: 3000,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const index = ref(0);
    // eslint-disable-next-line no-unused-vars
    let timer = null;
    const autoPlayFn = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        index.value++;
        // console.log(index.value, "52");
        if (index.value >= props.imgInfo.length) {
          index.value = 0;
        }
      }, props.duration);
    };

    // 监听数据变化
    watch(
      () => props.imgInfo,
      (newVal) => {
        if (newVal.length && props.autoPlay) {
          index.value = 0;
          // console.log("65");
          autoPlayFn();
        }
      },
      { immediate: true }
    );

    // 停止
    const stop = () => {
      clearInterval(timer);
    };

    // 开始
    const start = () => {
      if (props.autoPlay && props.imgInfo.length) {
        autoPlayFn();
      }
    };

    // 轮播按钮上一张或下一张
    const next = (count) => {
      index.value = index.value + count;
      if (index.value >= props.imgInfo.length - 1) {
        index.value = 0;
      }
      if (index.value < 0) {
        index.value = props.imgInfo.length - 1;
      }
      // return index.value;
    };
    return { index, stop, start, next };
  },
};
</script>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      // padding-left: 250px;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}

.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>