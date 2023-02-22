<template>
  <div class="home-banner"><XtxCarousel :imgInfo="sliders" auto-play /></div>
</template>

<script>
import { ref } from "vue";
import { findBanner } from "@/api/home";
export default {
  name: "HomeBanner",
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      // console.log(data, "15");
      sliders.value = data.result;
    });
    return { sliders };
  },
};
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  ::v-deep(.xtx-carousel) {
    .carousel {
      &-indicator {
        padding-left: 250px;
      }
      &-btn {
        &.prev {
          left: 270px;
        }
      }
    }
  }
}
</style>