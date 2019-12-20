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
        <h1 class="shopName">{{shopInfo.shopName}}</h1>
        <div class="shopInfo">
          <span>{{shopInfo.rateValue}}</span>
          <span>{{shopInfo.saleTimes}}</span>
        </div>
      </div>
      <div class="main">
        <div class="shopRecommendPart">商家推荐板块</div>
        <div class="fooList">
          <ul>
            <li v-for="(item,index) in foodList" :key="index">{{item.foodName}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeShoplist, getHomeFoodList } from "../../API/getHomeFoodList";
export default {
  created() {
    this.shopID = this.$route.params.id; //从路由参数中获取当前店铺ID，然后使用此ID请求该店铺下的菜品信息
    this._getFoodList();
    this._getShoplist();
  },
  data() {
    return {
      shopID: "-1",
      shopInfo: "", //店铺信息
      foodList: [] //菜品信息列表
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //请求店铺信息
    async _getShoplist() {
      this.shopInfo = await getHomeShoplist(this.shopID);
    },
    //请求该店铺的菜品信息
    async _getFoodList() {
      this.foodList = await getHomeFoodList(this.shopID);
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