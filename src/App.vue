<template>
  <div>
    <div>{{ $store.state.user.profile.name }}</div>
    <button @click="fn">mutations</button>
  </div>
</template>

<script>
import store from "./store";
export default {
  setup() {
    const fn = () => {
      store.commit("user/setName", "小明");
    };
    return { fn };
  },
};
</script>

<style>
</style>