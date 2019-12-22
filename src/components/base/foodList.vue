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
        <div class="allfoodList">
          <!-- <ul>
            <li v-for="(item,index) in groupFoodList" :key="index">
              <van-index-bar :index-list="indexList" highlight-color="red">
                <van-index-anchor index="10">{{groupFoodList[item]}}</van-index-anchor>
                <van-cell>
                  <foodItem :foodItem="groupFoodList[item]"></foodItem>
                </van-cell>
              </van-index-bar>
            </li>
          </ul>-->
          <van-index-bar
            class="indexBar"
            :index-list="indexList"
            highlight-color="#6495ed"
            :sticky="false"
          >
            <van-cell class="vantCell">
              <div v-for="index0 in indexList" :key="index0">
                <van-index-anchor :index="index0">{{index0}}</van-index-anchor>
                <div v-for="(item,index1) in groupFoodList[index0]" :key="index1">
                  <foodItem :foodItem="item"></foodItem>
                </div>
              </div>
            </van-cell>
          </van-index-bar>
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
      recommendFoodList: [], //商家推荐菜品信息列表
      groupFoodList: {}, //按菜品类型进行分类存储
      indexList: [] //菜品类型索引列表
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
      //遍历foodList ，
      for (let item in newVal) {
        //将菜品对象的isRecommend属性为yes的加入 推荐菜品列表
        if (newVal[item].isRecommend == "yes") {
          this.recommendFoodList.push(JSON.parse(JSON.stringify(newVal[item])));
        }
        let foodType = JSON.parse(JSON.stringify(newVal[item])).foodType;
        //菜品分组信息为空，直接插入
        if (JSON.stringify(this.groupFoodList) == "{}") {
          this.groupFoodList[foodType] = [
            JSON.parse(JSON.stringify(newVal[item]))
          ];
        } else {
          //将不同类型的菜品存入groupFoodList
          //此菜品类型尚未添加分组
          if (!this.groupFoodList[foodType]) {
            this.groupFoodList[foodType] = [
              JSON.parse(JSON.stringify(newVal[item]))
            ];
          } else {
            //此菜品已在分组
            this.groupFoodList[foodType].push(
              JSON.parse(JSON.stringify(newVal[item]))
            );
          }
        }
      }

      for (let key in this.groupFoodList) {
        this.indexList.push(key);
      }

      //   debugger;
      //   for (let index0 in this.indexList) {
      //     console.log("标题", this.indexList[index0]);
      //     for (let item in this.groupFoodList[this.indexList[index0]]) {
      //       console.log(this.groupFoodList[this.indexList[index0]][item]);
      //     }
      //   }
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
  //解决fixed定位不能滚动的问题
  overflow-y: scroll;
  overflow-x: hidden;
  .container {
    .goBackPart {
      position: fixed;
      top: 0;
      height: 2vh;
      width: 100%;
      height: 6vh;
      z-index: 9999;
      background: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(rgba(255, 255, 255, 0)),
        to(rgba(0, 0, 0, 0.2))
      );
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
      .allfoodList {
        margin-top: 2rem;

        li {
          width: 100%;
          height: 15vh;
          box-sizing: border-box;
          display: inline-block;
          box-shadow: 2px 2px 1px #888888;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .indexBar {
          height: 100vh;
          /deep/ .van-index-bar__sidebar {
            position: sticky;
            top: 6vh;
            left: 0;
            background-color: white;
            color: black;
            width: 24vw;
            height: 0;
            span {
              padding: 0.5rem 0;
              border: 1px solid gray;
            }
          }
        }
        .vantCell {
          float: right;
          width: 80vw;
          padding: 0 16px;
        }
      }
    }
  }
}
</style>