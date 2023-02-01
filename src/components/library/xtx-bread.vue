<script>
import { h } from "vue";
export default {
  name: "XtxBread",
  render() {
    // 获取所有所有slot中的默认值
    const items = this.$slots.default();
    // console.log(items, "14");
    const draminic = [];
    items.forEach((item, i) => {
      draminic.push(item);
      if (i < items.length - 1) {
        // 创建并添加i元素
        draminic.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "xtx-bread" }, draminic);
  },
};
</script>

<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>