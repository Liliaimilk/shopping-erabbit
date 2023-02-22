<template>
  <div class="goods-comment">
    <div class="head" v-if="goods">
      <div class="data">
        <p>
          <span>{{ goods.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ goods.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:;"
            :class="{ active: index === -1 }"
            @click="selected(-1)"
            >全部评价（{{ goods.evaluateCount }}）</a
          >
          <template v-for="(item, ind) in goods.tags" :key="ind">
            <a
              href="javascript:;"
              @click="selected(ind, item.title)"
              :class="{ active: ind === index }"
              >{{ item.title }}（{{ item.tagCount }}）</a
            >
          </template>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
    <template v-for="item in commentList.items" :key="item.id">
      <GoodsList :commentInfo="item" />
    </template>
  </div>
</template>
<script>
import GoodsList from "./goods-list.vue";
import { findCommentInfoByGoods, findGoodsCommentList } from "@/api/good";
import bindData from "@/vender/eventBroker";
import { onMounted, reactive, ref, watch } from "vue";
export default {
  name: "GoodsComment",
  components: {
    GoodsList,
  },
  props: {
    goodsId: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const index = ref(-1);
    const paramsData = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null,
    });
    // 评价数据
    const goods = getEvaluteInfo(props.goodsId);
    const commentList = ref([]);
    // 渲染按钮
    const selected = (ind, title) => {
      index.value = ind;
      // 选项选择
      if (title === "有图") {
        paramsData.value.hasPicture = true;
        paramsData.value.tag = null;
      } else if (title === "全部评价") {
        paramsData.value.tag = null;
        paramsData.value.hasPicture == null;
        paramsData.value.sortField = "praiseCount";
      } else {
        paramsData.value.hasPicture = null;
        paramsData.value.tag = title;
      }
      paramsData.value.page = 1;
    };
    // 监听数据改变
    watch(
      paramsData,
      () =>
        findGoodsCommentList(props.goodsId, paramsData).then((data) => {
          console.log(data, "90");
          commentList.value = data.result;
        }),
      { immediate: true }
    );

    // 排序
    onMounted(() => {
      // 事件代理
      let sort = document.querySelector(".sort");
      bindData(sort, "click", "A", function (event) {
        event.preventDefault();
        const target = event.target;
        // console.log(event.target);
        // console.log(target.nodeName);
        if (target.nodeName === "A") {
          let sortAll = document.querySelectorAll(".sort>a");
          // 选项判定
          if (target.nodeValue === "最新") {
            paramsData.sortField = "createTime";
          } else if (target.nodeValue === "最热") {
            paramsData.sortField = "praiseCount";
          } else {
            paramsData.sortField = null;
          }
          paramsData.page = 1;
          // 清除类名
          for (let i = 0; i < sortAll.length; i++) {
            sortAll[i].classList.remove("active");
          }
          // 添加类名
          target.classList.toggle("active");
        }
      });
    });
    return { goods, selected, index, commentList };
  },
};
// 获取评论信息
const getEvaluteInfo = (id) => {
  const goods = ref(null);
  findCommentInfoByGoods(id).then((data) => {
    data.result.tags.unshift({
      type: "img",
      title: "有图",
      tagCount: data.result.hasPictureCount,
    });
    goods.value = data.result;
    console.log(goods);
  });
  console.log("59");
  return goods;
};
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>