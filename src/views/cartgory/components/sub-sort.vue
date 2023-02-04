<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:;"
        @click="getsortParams(null)"
        :class="{ active: sortParams.sortField == null }"
        >默认排序</a
      >
      <a
        href="javascript:;"
        @click="getsortParams('publishTime')"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        >最新商品</a
      >
      <a
        href="javascript:;"
        @click="getsortParams('orderNum')"
        :class="{ active: sortParams.sortField == 'orderNum' }"
        >最高人气</a
      >
      <a
        href="javascript:;"
        @click="getsortParams('evaluateNum')"
        :class="{ active: sortParams.sortField == 'evaluateNum' }"
        >评论最多</a
      >
      <a href="javascript:;" @click="getsortParams('price')">
        价格排序
        <i
          class="arrow up"
          :class="{ active: sortParams.sortMethod == 'desc' }"
        />
        <i
          class="arrow down"
          :class="{ active: sortParams.sortMethod == 'asc' }"
        />
      </a>
    </div>
    <div class="check">
      <XtxCheckbox v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox>仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue-demi";
export default {
  name: "SubSort",
  setup() {
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null,
      sortMethod: null,
    });
    const getsortParams = (item) => {
      if (item === "price") {
        sortParams.sortField = "price";
        if (sortParams.sortMethod == "asc") {
          sortParams.sortMethod = "desc";
        } else {
          sortParams.sortMethod = "asc";
        }
      } else {
        sortParams.sortMethod = null;
        sortParams.sortField = item;
      }
    };
    return { sortParams, getsortParams };
  },
};
</script>
<style scoped lang='less'>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>