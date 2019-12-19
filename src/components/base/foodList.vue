<template>
  <div class="foodList">
    <div class="container">
      <div class="goBackPart">
        <span @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </span>
      </div>
      <div class="header">
        <img class="shopPic" src alt />
        <h1 class="shopName">店铺名称</h1>
        <div class="shopInfo">
          <span>评价</span>
          <span>月售</span>
        </div>
      </div>
      <div class="main">
        <div class="shopRecommendPart">商家推荐板块</div>
        <div class="fooList">菜品板块</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.shopID = this.$route.params.id; //从路由参数中获取当前店铺ID，然后使用此ID请求该店铺下的菜品信息
  },
  data() {
    return {
      shopID: "-1"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //请求该店铺的菜品信息
    _getFoodList(){

    }
  }
};
</script>

<style lang="less" scoped>
.foodList {
  width: 100vw;
  height: 100vh;
  background: white;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
}
</style>