<template>
  <div class="xtx-pagination" v-if="total">
    <a
      href="javascript:;"
      :class="{ disabled: currPage === 1 }"
      @click="flip(-1)"
      >上一页</a
    >
    <span v-if="pages.start > 1">...</span>
    <a
      href="javascript:;"
      @click="changeStatus(item, ind)"
      :class="{
        active: item === currPage,
      }"
      v-for="(item, ind) in pages.pageArr"
      :key="ind"
      >{{ item }}</a
    >
    <span v-if="pages.end < 9">...</span>
    <a
      href="javascript:;"
      @click="flip(1)"
      :class="{ disabled: currPage === total }"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
export default {
  name: "XtxPagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const currPage = ref(1);
    const btnCount = 5;
    // 分页
    const pages = computed(() => {
      let start = currPage.value - Math.floor(btnCount / 2);
      let end = currPage.value + Math.floor(btnCount / 2);
      const pageArr = [];
      if (start <= 1) {
        start = 1;
        end = props.total >= btnCount ? btnCount : props.total;
      } else {
        console.log(currPage.value, "48");
        if (end >= props.total) {
          end = props.total;
          start = props.total - btnCount + 1;
        }
      }
      for (let i = start; i <= end; i++) {
        pageArr.push(i);
        // console.log(pageArr);
      }
      return { pageArr, start, end };
    });

    // 点击事件
    // 点击页面
    const changeStatus = (item) => {
      currPage.value = item;
      emit("changePage", item);
    };
    // 点击上下页
    const flip = (num) => {
      currPage.value += num;
      emit("changePage", currPage.value);
    };

    // 监听
    watch(
      props,
      () => {
        currPage.value = props.currentPage;
      },
      { immediate: true }
    );
    return { pages, changeStatus, currPage, flip };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>