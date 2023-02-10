<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span class="placeholder">{{ currList ? currList : defaultLocal }}</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <template v-if="!loading">
        <span
          class="ellipsis"
          v-for="item in cityData"
          :key="item.code"
          @click="selectLocation(item)"
          >{{ item.name }}</span
        >
      </template>
      <span v-else><img src="@/assets/images/load.gif" alt="" /></span>
    </div>
  </div>
</template>
<script>
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import axios from "axios";
export default {
  name: "XtxCity",
  props: {
    defaultLocal: {
      type: String,
      required: true,
    },
  },
  setup() {
    const active = ref(false);
    const cityData = ref(null);
    const loading = ref(false);
    let localList = [];
    const currList = ref(null);
    // 设置隐藏按钮
    const toggleDialog = () => {
      loading.value = true;
      active.value = !active.value;
      console.log(active.value);
      //获取数据
      getCityData().then((data) => {
        cityData.value = data;
        // console.log(data, "41");
      });
      loading.value = false;
    };

    //点击外部元素失焦关闭窗口
    const target = ref(null);
    onClickOutside(target, () => {
      active.value = false;
      localList = [];
    });

    // 选择地址
    const selectLocation = (item) => {
      localList.push(item.name);
      console.log(localList, "60");
      cityData.value = item.areaList;
      if (item.level === 2) {
        currList.value = localList[0] + " " + localList[1] + " " + localList[2];
        console.log(currList.value);
        localList = active.value = false;
        localList = [];
        return;
      }
    };

    return {
      active,
      toggleDialog,
      target,
      cityData,
      loading,
      selectLocation,
      currList,
    };
  },
};

// 获取城市数据
const getCityData = () => {
  return new Promise((resolve) => {
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((data) => {
        console.log(data.data, "85");
        window.cityData = data.data;
        // 返回一个Promise对象
        resolve(window.cityData);
      });
    }
  });
};
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>