<template>
  <div class="main">
    <router-view name="home"></router-view>
    <router-view name="today"></router-view>
    <router-view name="order"></router-view>
    <router-view name="person"></router-view>

    <!-- tab分类 -->
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

<style>
</style>