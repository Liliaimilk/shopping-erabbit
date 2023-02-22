<template>
  <!-- 列表 -->
  <div class="list">
    <div class="item">
      <div class="user">
        <img :src="commentInfo.member.avatar" alt="" />
        <span>{{ commentInfo.member.nickname }}</span>
      </div>
      <div class="body">
        <div class="score">
          <i
            class="iconfont icon-wjx01"
            v-for="item in commentInfo.score"
            :key="item"
          ></i>
          <i
            class="iconfont icon-wjx02"
            v-for="item in disScore"
            :key="item"
          ></i>
          <span class="attr">{{ commodifyInfo() }}</span>
        </div>
        <div class="text">
          {{ commentInfo.content }}
        </div>
        <GoodsCommentImages
          v-if="commentInfo.pictures"
          :pictures="commentInfo.pictures"
        />
        <div class="time">
          <span>{{ commentInfo.createTime }}</span>
          <span class="zan"
            ><i class="iconfont icon-dianzan"></i
            >{{ commentInfo.praiseCount }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsCommentImages from "./goods-comment-images.vue";

import { computed, ref } from "vue";
export default {
  name: "GoodsList",
  components: {
    GoodsCommentImages,
  },
  props: {
    commentInfo: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const goodsInfo = ref([]);
    const disScore = computed(() => {
      const count = 5 - props.commentInfo.score;
      return count;
    });
    const commodifyInfo = () => {
      goodsInfo.value = props.commentInfo.orderInfo.specs;
      return goodsInfo.value
        .slice(0, 2)
        .reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, "")
        .trim();
    };
    return { disScore, commodifyInfo };
  },
};
</script>

<style lang="less" scoped>
.list {
  padding: 0 20px;
  .item {
    display: flex;
    padding: 25px 10px;
    border-bottom: 1px solid #f5f5f5;
    .user {
      width: 160px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        padding-left: 10px;
        color: #666;
      }
    }
    .body {
      flex: 1;
      .score {
        line-height: 40px;
        .iconfont {
          color: #ff9240;
          padding-right: 3px;
        }
        .attr {
          padding-left: 10px;
          color: #666;
        }
      }
    }
    .text {
      color: #666;
      line-height: 24px;
    }
    .time {
      color: #999;
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
    }
  }
}
</style>