<template>
  <div class="goods-image">
    <div
      class="large"
      :style="[
        { backgroundImage: `url(${images[currIndex]})` },
        largePosizition,
      ]"
      v-if="!show"
    ></div>
    <div class="middle" ref="target">
      <div class="layer" :style="layerPosiztion" v-if="!show">
        {{ elementX }}
      </div>
      <img :src="images[currIndex]" alt="" />
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch, reactive } from "vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  name: "GoodsImage",
  props: {
    images: {
      type: [Object, Array],
      default: () => {},
    },
  },
  setup() {
    const currIndex = ref(0);
    const target = ref(null);
    const show = ref(false);
    // 获取鼠标在元素位置
    const { elementX, elementY, isOutside } = useMouseInElement(target);
    //遮罩层位置
    const layerPosiztion = reactive({
      top: 0,
      left: 0,
    });
    // 大图位置
    const largePosizition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0,
    });

    // 监听图位置

    watch([elementX, elementY, isOutside], () => {
      show.value = isOutside.value;
      //   设置遮罩图位置
      const position = { x: 0, y: 0 };
      // Y
      if (elementX.value < 100) {
        position.x = 0;
      } else if (elementX.value > 300) {
        position.x = 200;
      } else {
        position.x = elementX.value - 100;
      }
      // X
      if (elementY.value < 100) {
        position.y = 0;
      } else if (elementY.value > 300) {
        position.y = 200;
      } else {
        position.y = elementY.value - 100;
      }

      layerPosiztion.top = position.y + "px";
      layerPosiztion.left = position.x + "px";
      //   设置大图位置
      largePosizition.backgroundPositionY = position.y * -2 + "px";
      largePosizition.backgroundPositionX = position.x * -2 + "px";
      //   console.log(largePosizition.backgroundPositionX);
    });
    return {
      currIndex,
      target,
      elementX,
      layerPosiztion,
      largePosizition,
      show,
    };
  },
};
</script>

<style lang='less' scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>