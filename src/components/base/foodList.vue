<template>
  <div class="foodList">
    <div class="container">
      <div class="goBackPart">
        <span @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </span>
      </div>
      <div class="header">
        <img class="shopPic" :src="shopInfo.pic_url" />
        <h1 class="shopName">{{shopInfo.shopName}}</h1>
        <div class="shopInfo">
          <span>评价：{{shopInfo.rateValue}} 分</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>月售：{{shopInfo.saleTimes}} 份</span>
        </div>
      </div>
      <div class="main">
        <div class="shopRecommendPart" v-if="recommendFoodList.length>0">
          <h3>商家推荐</h3>
          <!-- 推荐列表长度小于3，使用普通div居中 -->
          <div style="text-align:center" v-if="recommendFoodList.length<3">
            <div class="recommendItem" v-for="(item,index) in recommendFoodList" :key="index">
              <foodItemRecommend :foodItem="item"></foodItemRecommend>
            </div>
          </div>
          <!-- 推荐列表长度大于3，使用轮播组件 -->
          <div v-else>
            <van-swipe :loop="false" :width="160">
              <van-swipe-item
                class="recommendSwipe"
                v-for="(item,index) in recommendFoodList"
                :key="index"
              >
                <foodItemRecommend :foodItem="item"></foodItemRecommend>
              </van-swipe-item>
              <!-- 自定义指示器，设为空 -->
              <div class="custom-indicator" slot="indicator"></div>
            </van-swipe>
          </div>
        </div>
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
import foodItemRecommend from "../base/foodItemRecommend";
import foodItem from "../base/foodItem";
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
      foodList: [], //菜品信息列表
      recommendFoodList: [] //商家推荐菜品信息列表
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
  },
  watch: {
    foodList(newVal) {
      //遍历foodList ， 将菜品对象的isRecommend属性为yes的加入 推荐菜品列表
      for (let item in newVal) {
        if (newVal[item].isRecommend == "yes") {
          this.recommendFoodList.push(JSON.parse(JSON.stringify(newVal[item])));
        }
      }
    }
  },
  components: {
    foodItemRecommend,
    foodItem
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
  .container {
    .goBackPart {
      position: fixed;
      top: 0;
      height: 2vh;
      span {
        font-size: 2rem;
      }
    }
    .header {
      text-align: center;
      .shopPic {
        width: 100vw;
        height: 40vh;
      }
      .shopName {
        font-size: 1.2rem;
        padding: 0.3rem 0;
      }
      .shopInfo {
        color: gray;
        font-size: 0.8rem;
        span {
        }
      }
    }
    .main {
      .shopRecommendPart {
        margin: 0.5rem 0rem;
        border-top: 1px dotted gray;
        h3 {
          font-size: 1rem;
          padding: 0.2rem 1rem;
        }
        .recommendItem {
          width: 40vw;
          height: 32vh;
          box-sizing: border-box;
          display: inline-block;
          box-shadow: 2px 2px 1px #888888;
        }
        .recommendItem:nth-child(1) {
          margin-right: 1rem;
        }
        /deep/ .van-swipe-item {
          padding: 0 0.5rem;
          box-sizing: content-box;
          box-shadow: 3px 1px 1px #888888;
        }
        /deep/ .van-swipe__track {
          width: 2000px !important;
          .recommendSwipe {
            height: 32vh !important;
            box-sizing: border-box;
          }
        }
      }
      .foodList {
      }
    }
  }
}
</style>