<template>
  <div>
    <XtxBread>
      <XtxBreadItem to="/">首页</XtxBreadItem>
      <Transition name="fade-right" mode="out-in">
        <XtxBreadItem
          :to="`/category/${category.item.id}`"
          v-if="category.item"
          >{{ category.item.name }}</XtxBreadItem
        >
      </Transition>

      <Transition name="fade-right" mode="out-in">
        <XtxBreadItem v-if="category.sub">{{ category.sub.name }}</XtxBreadItem>
      </Transition>
    </XtxBread>
  </div>
</template>

<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  name: "SubBread",
  setup() {
    const store = useStore();
    const route = useRoute();
    const category = computed(() => {
      const obj = {};
      store.state.cartgory.list.forEach((item) => {
        item.children &&
          item.children.forEach((sub) => {
            if (sub.id === route.params.id) {
              // 设置二级类目
              obj.sub = { id: sub.id, name: sub.name };
              // 设置一级类目
              obj.item = { id: item.id, name: item.name };
            }
          });
      });
      return obj;
    });
    return { category };
  },
};
</script>

<style>
</style>