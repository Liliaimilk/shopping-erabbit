<template>
  <div class="goods-sku">
    <dl v-for="(item, i) in skuData.specs" :key="i">
      <dt>{{ item.name }}</dt>
      <dd v-for="(sub, i) in item.values" :key="i">
        <img
          :class="{ selected: sub.selected }"
          :src="sub.picture"
          alt=""
          v-if="sub.picture"
          @click="changeFn(item, sub)"
        />
        <span
          v-else
          @click="changeFn(item, sub)"
          :class="{ selected: sub.selected }"
          >{{ sub.name }}</span
        >
      </dd>
    </dl>
  </div>
</template>
<script>
// import { ref } from "vue";
export default {
  name: "GoodsSku",
  props: {
    skuData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const changeFn = (item, sub) => {
      if (sub.selected) {
        sub.selected = false;
      } else {
        item.values.forEach((i) => {
          i.selected = false;
        });
        sub.selected = true;
      }
    };

    return { changeFn };
  },
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