<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goodsInfo="item" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue-demi";
import { ref } from "vue";
import { findHotGoods } from "@/api/good.js";
import GoodsItem from "../../cartgory/components/goods-item.vue";
export default {
  name: "GoodsHot",
  components: {
    GoodsItem,
  },
  props: {
    isNumber: {
      type: Number,
      default: 1,
    },
    id: {
      type: String,
    },
  },
  setup(props) {
    // 选择标题
    const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
    const title = computed(() => {
      return titleObj[props.isNumber];
    });

    // 获取商品列表
    const goodsList = ref([]);
    findHotGoods({
      id: props.id,
      type: props.isNumber,
    }).then((data) => {
      console.log(data);
      // map迭代用for..of循环，而for-of常用于异步的遍历，依次遍历执行，不会像for-in一样瞬间同步执行
      // 这样在同一接口同一组件不同参数复用时会造成变量迭代渲染页面不及时被后面值覆盖，从而出现页面渲染数据一致的情况
      goodsList.value = data.result.map((item) => item);
      // console.log(goodsList.value);
      // data.result.forEach((item) => {
      //   goodsList.value = item;
      //   console.log(goodsList.value);
      // });
    });

    return { title, goodsList };
  },
};
</script>

<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style> 