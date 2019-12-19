<template>
  <div class="main">
    <transition name="slide-left">
      <router-view name="home"></router-view>
      <router-view name="today"></router-view>
      <router-view name="order"></router-view>
      <router-view name="person"></router-view>
      <!-- tab分类 -->
    </transition>
    <tab></tab>
  </div>
</template>

<script>
import tab from "../../components/tab/tab";
export default {
  components: {
    tab
  }
};
</script>

<style lang="less" scoped>
.slide-left-enter {
  opacity: 0;
  // transform: translateX(100%);
}

.slide-left-enter-active {
  transition: all 400ms;
}

.slide-left-leave-to {
  opacity: 0;
  // transition: translateX(-100%);
}
</style>