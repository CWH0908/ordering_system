<template>
  <div class="home">
    <!-- 头部搜索栏 -->
    <cheader></cheader>

    <!-- 美食类别导航 -->
    <navPart></navPart>

    <!-- 推荐列表 -->
    <recommend></recommend>
    
  </div>
</template>

<script>
import cheader from "../home/cheader";
import navPart from "../home/navPart";
import recommend from "../home/recommend";
export default {
  components: {
    cheader,
    navPart,
    recommend
  }
};
</script>

<style>
</style>