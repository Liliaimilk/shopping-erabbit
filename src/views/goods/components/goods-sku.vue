<template>
  <div class="goods-sku">
    <dl v-for="(item, i) in skuData.specs" :key="i">
      <dt>{{ item.name }}</dt>
      <dd v-for="(sub, i) in item.values" :key="i">
        <img
          :class="{ selected: sub.selected, disabled: sub.disabled }"
          :src="sub.picture"
          alt=""
          v-if="sub.picture"
          @click="changeFn(item, sub)"
        />
        <span
          v-else
          @click="changeFn(item, sub)"
          :class="{ selected: sub.selected, disabled: sub.disabled }"
          >{{ sub.name }}</span
        >
      </dd>
    </dl>
  </div>
</template>
<script>
// import { ref } from "vue";
import getPowerSet from "@/vender/powerSet";
export default {
  name: "GoodsSku",
  props: {
    skuData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // 调用
    const powerMap = getPathMap(props.skuData.skus);
    console.log(powerMap, "48");
    // 初始化刷新
    forbidden(props.skuData.specs, powerMap);
    // 选中样式
    const changeFn = (item, sub) => {
      if (sub.disabled) return false;
      if (sub.selected) {
        sub.selected = false;
      } else {
        item.values.forEach((i) => {
          i.selected = false;
        });
        sub.selected = true;
      }
      //
      forbidden(props.skuData.specs, powerMap);
    };

    return { changeFn };
  },
};
// 根据skus得到路径字典对象
const spliter = "★";
const getPathMap = (skus) => {
  const powerMap = {};
  skus.forEach((item) => {
    if (item.inventory) {
      const sku = item.specs.map((sku) => sku.valueName);
      // console.log(sku);
      const powerSet = getPowerSet(sku);
      powerSet.forEach((set) => {
        const key = set.join(spliter);
        // 判断值是否存在
        if (powerMap[key]) {
          powerMap[key].push(item.id);
        } else {
          powerMap[key] = [item.id];
        }
      });
    }
  });
  return powerMap;
};

//得到当前选中规格的数据集合
const selectedGather = (specs) => {
  const selectedList = [];
  specs.forEach((item) => {
    const selectArr = item.values.find((sub) => sub.selected);
    selectedList.push(selectArr ? selectArr.name : undefined);
  });
  // console.log(selectedList);
  return selectedList;
};
// 更新禁用按钮
const forbidden = (specs, powerMap) => {
  console.log(specs);
  specs.forEach((item, i) => {
    // 遍历下一个规格时，重新赋值使选中的规格保持不变
    const selectedList = selectedGather(specs);
    item.values.forEach((sub) => {
      if (sub.name === selectedList[i]) return false;
      selectedList[i] = sub.name;
      const key = selectedList.filter((v) => v).join(spliter);
      // console.log(selectedList[i]);
      // console.log(key);
      // 查找是否路径字典是否有值
      sub.disabled = !powerMap[key];
    });
  });
};
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
