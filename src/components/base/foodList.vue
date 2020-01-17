<template>
  <div class="foodList">
    <div class="container">
      <!-- 返回按钮 -->
      <div class="goBackPart">
        <span @click="goBack">
          <i class="el-icon-arrow-left"></i>
        </span>
      </div>

      <!-- 头部栏 -->
      <div class="header">
        <div>
          <img class="shopPic" :src="getPicUrl(shopInfo.pic_url)" />
        </div>
        <h1 class="shopName">{{shopInfo.shopName}}</h1>
        <div class="shopInfo">
          <span>评价：{{shopInfo.rateValue}} 分</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>已售：{{shopInfo.saleTimes}} 份</span>
          <el-button
            @click="toggleShopDetail"
            class="shopDetailButton"
            type="primary"
            size="mini"
          >详情</el-button>
        </div>
      </div>

      <!-- 主体部分 -->
      <div class="main">
        <div class="shopRecommendPart" v-if="recommendFoodList.length>0">
          <h3>商家推荐</h3>
          <!-- 推荐列表长度小于3，使用普通div居中 -->
          <div style="text-align:center" v-if="recommendFoodList.length<3">
            <div class="recommendItem" v-for="(item,index) in recommendFoodList" :key="index">
              <foodItemRecommend :foodItem="item" @selectFoodItem="selectFoodItem"></foodItemRecommend>
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
                <foodItemRecommend :foodItem="item" @selectFoodItem="selectFoodItem"></foodItemRecommend>
              </van-swipe-item>
              <!-- 自定义指示器，设为空 -->
              <div class="custom-indicator" slot="indicator"></div>
            </van-swipe>
          </div>
        </div>
        <div class="allfoodList">
          <!-- vant索引栏 -->
          <van-index-bar
            class="indexBar"
            :style="stickyHeight"
            :index-list="indexList"
            highlight-color="#6495ed"
            :sticky="false"
          >
            <van-cell class="vantCell">
              <div v-for="index0 in indexList" :key="index0">
                <van-index-anchor :index="index0">{{index0}}</van-index-anchor>
                <div v-for="(item,index1) in groupFoodList[index0]" :key="index1">
                  <foodItem :foodItem="item" @selectFoodItem="selectFoodItem"></foodItem>
                  <!-- :buyNums="item|findFoodBuyNums" -->
                </div>
              </div>
            </van-cell>
          </van-index-bar>
        </div>
      </div>
    </div>

    <!-- 店铺详情板块 -->
    <div class="shopDetails" v-show="isShowShopDetails" @click.self="toggleShopDetail">
      <div class="info">
        <p>
          <span>店铺名称</span>
          <span>{{this.shopInfo.shopName}}</span>
        </p>
        <p>
          <span>店铺类型</span>
          <span>{{this.shopInfo.mallType|formatMallType}}</span>
        </p>
        <p>
          <span>营业时间</span>
          <span>{{this.shopInfo.openTime}} — — {{this.shopInfo.closeTime}}</span>
        </p>
        <p>
          <span>已售出</span>
          <span>{{this.shopInfo.saleTimes}}&nbsp;份</span>
        </p>
        <p>
          <span>用户评分</span>
          <span>
            <el-rate style="display:inline-block;" v-model="shopInfo.rateValue" disabled></el-rate>
          </span>
        </p>
        <p>
          <span>起送价</span>
          <span>￥&nbsp;{{this.shopInfo.startFee}}</span>
        </p>
        <p>
          <span>配送费</span>
          <span>￥&nbsp;{{this.shopInfo.sendFee}}</span>
        </p>

        <p>
          <span>联系方式</span>
          <span>{{this.shopInfo.phone}}</span>
        </p>
      </div>
    </div>

    <div class="fullDiv" v-if="isClose">
      <!-- 打样时候使用的背景板 -->
    </div>

    <!-- 购物车板块 -->
    <shopCar :shopInfo="shopInfo" @click.native="toggleShopCar" @goSettlement="goSettlement"></shopCar>
    <shopCarInfo v-show="isShowShopCarInfo" :shopID="shopID" @toggleShopCar="toggleShopCar"></shopCarInfo>

    <!-- 确认订单板块 -->
    <transition name="slide-left">
      <router-view name="confirmOredr"></router-view>
    </transition>
  </div>
</template>

<script>
import { getHomeShoplist, getHomeFoodList } from "../../API/getHomeFoodList";
import { mapMutations, mapGetters } from "vuex";
import foodItemRecommend from "../base/foodItemRecommend";
import foodItem from "../base/foodItem";
import shopCar from "../base/shopCar";
import shopCarInfo from "../base/shopCarInfo";
import corfirmOrder from "../base/corfirmOrder";
import { qiniuDomain } from "../../API/qiniuDomain";
import { Toast } from "vant";
let that; //全局this对象
export default {
  beforeCreate() {
    //保存this，以供filters过滤器调用实例的数据
    that = this;
  },
  created() {
    this.shopID = this.$route.params.id; //从路由参数中获取当前店铺ID，然后使用此ID请求该店铺下的菜品信息
    this._getFoodList();
    this._getShoplist();
    setInterval(() => {
      let time = new Date();
      this.currentTime =
        this.addZero(time.getHours()) + ":" + this.addZero(time.getMinutes());
    }, 1000);
  },
  data() {
    return {
      shopID: "-1",
      shopInfo: {}, //店铺信息
      allFoodList: [], //所有菜品信息列表（包含推荐和其他）
      foodList: [], //菜品信息列表
      recommendFoodList: [], //商家推荐菜品信息列表
      groupFoodList: {}, //按菜品类型进行分类存储
      indexList: [], //菜品类型索引列表
      stickyHeight: "height:100vh", //粘性定位的元素高度，根据foodList数据动态获取
      isShowShopCarInfo: false, //是否显示购物车详情组件
      isShowShopDetails: false, //是否显示店铺详情
      currentTime: "", //当前时间
      isClose: false //当前是否关门
    };
  },
  //此filters方式已废弃
  //   filters: {
  //     //对传入的foodItem，返回其在购物车内的数量
  //     findFoodBuyNums(foodItem) {
  //       that.$nextTick(function() {
  //         for (let i in that.all_shop_car) {
  //           //首先找到店铺
  //           if (that.all_shop_car[i].shopID == that.shopID) {
  //             if (that.all_shop_car[i].shopCar.length == 0) {
  //               return 0;
  //             } else {
  //               for (let j in that.all_shop_car[i].shopCar) {
  //                 if (that.all_shop_car[i].shopCar[j].foodData.foodID == foodItem.foodID) {
  //                   //返回在vuex中的购物车计数器的值
  //                   //   debugger;
  //                   console.log(that.all_shop_car[i].shopCar[j].foodCount);
  //                   return that.all_shop_car[i].shopCar[j].foodCount;
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       });
  //     }
  //   },
  methods: {
    //修改购物车信息(当前店铺)
    ...mapMutations({
      set_all_shop_car: "set_all_shop_car"
    }),
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    goBack() {
      this.$router.go(-1);
    },
    //请求店铺信息
    async _getShoplist() {
      this.shopInfo = await getHomeShoplist(this.shopID);
    },
    //请求该店铺的菜品信息
    async _getFoodList() {
      this.allFoodList = await getHomeFoodList(this.shopID);
    },
    //选择菜品，接收菜品信息和数量
    selectFoodItem(foodInfo, count) {
      //点击菜品修改数量后，根据 all_shop_car 里当前店铺的shopCar信息进行增删改操作
      this.all_shop_car.forEach(shopItem => {
        //修改当前店铺的购物车信息
        if (shopItem.shopID == this.shopID) {
          //当前店铺的购物车数组为空，直接插入新增数据
          if (shopItem.shopCar.length == 0) {
            let newObj = {};
            newObj.shopID = this.shopID;
            newObj.foodData = foodInfo;
            newObj.foodCount = count; //菜品数量
            let newArr = [newObj];
            //$set插入数组才能触发更新
            shopItem.shopCar.push(newObj);
            // this.$set(shopItem.shopCar,0,newArr)
            this.set_all_shop_car(this.all_shop_car); //保存到vuex
          } else {
            //当前修改的菜品信息在购物车数组中不存在，直接插入，如果已存在，修改该菜品下的数量即可
            let isExit = false; //菜品已存在？，默认不存在
            shopItem.shopCar.forEach(foodItem => {
              if (foodItem.foodData.foodID == foodInfo.foodID) {
                isExit = true;
              }
            });
            //菜品不存在
            if (!isExit) {
              let newObj = {};
              newObj.shopID = this.shopID;
              newObj.foodData = foodInfo;
              newObj.foodCount = count; //菜品数量
              shopItem.shopCar.push(newObj);
              this.set_all_shop_car(this.all_shop_car); //保存到vuex
            } else {
              //菜品已存在，修改数量
              shopItem.shopCar.forEach(foodItem => {
                if (foodItem.foodData.foodID == foodInfo.foodID) {
                  //数量为0，删除购物车中该菜品
                  if (count == 0) {
                    //遍历购物车所有信息，删除指定foodID的数据
                    for (let i in shopItem.shopCar) {
                      if (
                        shopItem.shopCar[i].foodData.foodID ==
                        foodItem.foodData.foodID
                      ) {
                        shopItem.shopCar.splice(i, 1);
                      }
                    }
                    this.set_all_shop_car(this.all_shop_car); //保存到vuex
                  } else {
                    foodItem.foodCount = count;
                    this.set_all_shop_car(this.all_shop_car); //保存到vuex
                  }
                }
              });
            }
          }
        }
      });
    },
    //修改购物车详情显隐
    toggleShopCar() {
      this.isShowShopCarInfo = !this.isShowShopCarInfo;
      if (this.isShowShopCarInfo) {
        //显示购物车时，将foodList禁止滚动
        document
          .getElementsByClassName("foodList")[0]
          .addEventListener("touchmove", this.preventDOM, {
            passive: false
          }); //passive 参数不能省略，用来兼容ios和android
      } else {
        document
          .getElementsByClassName("foodList")[0]
          .removeEventListener("touchmove", this.preventDOM, {
            passive: false
          }); //passive 参数不能省略，用来兼容ios和android
      }
    },
    //阻止foodList组件页面滚动的函数
    preventDOM(e) {
      e.preventDefault();
    },
    //显示确认订单组件
    goSettlement(currentMoney) {
      this.$router.push({
        name: "confirmOredr"
      });
    },
    //控制店铺详情的显隐
    toggleShopDetail() {
      this.isShowShopDetails = !this.isShowShopDetails;
      if (this.isShowShopDetails) {
        //foodList禁止滚动
        document
          .getElementsByClassName("foodList")[0]
          .addEventListener("touchmove", this.preventDOM, {
            passive: false
          }); //passive 参数不能省略，用来兼容ios和android
      } else {
        document
          .getElementsByClassName("foodList")[0]
          .removeEventListener("touchmove", this.preventDOM, {
            passive: false
          }); //passive 参数不能省略，用来兼容ios和android
      }
    },
    //补0函数
    addZero(time) {
      return time < 10 ? "0" + time : time;
    }
  },
  computed: {
    //所有购物车信息，数组
    ...mapGetters(["all_shop_car"]),
  },
  watch: {
    allFoodList(newVal) {
      //遍历foodList ，
      for (let item in newVal) {
        //将菜品对象的isRecommend属性为yes的加入 推荐菜品列表
        if (newVal[item].isRecommend == "yes") {
          this.recommendFoodList.push(JSON.parse(JSON.stringify(newVal[item])));
        } else {
          //其他菜品
          this.foodList.push(JSON.parse(JSON.stringify(newVal[item])));
        }
      }
    },
    foodList(newVal) {
      for (let item in newVal) {
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

      //得出菜品分组的key值
      for (let key in this.groupFoodList) {
        this.indexList.push(key);
      }

      //得出粘性布局的高度,每个foodItem的高度设为17vh
      this.stickyHeight = "height:" + newVal.length * 17 + "vh";
    },
    currentTime(newVal) {
      let currentHour = newVal.split(":")[0];
      let currentMinut = newVal.split(":")[1];
      //将17：05 转成1705的数值形式，与开关门时间进行比较
      let currentTimeNumber = Number(currentHour + currentMinut);

      let openHour = this.shopInfo.openTime.split(":")[0];
      let openMinut = this.shopInfo.openTime.split(":")[1];
      let openTimeNumber = Number(openHour + openMinut);

      let closeHour = this.shopInfo.closeTime.split(":")[0];
      let closeMinut = this.shopInfo.closeTime.split(":")[1];
      let closeTimeNumber = Number(closeHour + closeMinut);

      if (
        currentTimeNumber >= openTimeNumber &&
        currentTimeNumber < closeTimeNumber
      ) {
        //正常营业
        // console.log("正常营业");
      } else {
        this.isClose = false;
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "店铺打烊了~正在返回首页"
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `店铺打烊了~正在返回首页`;
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            Toast.clear();
          }
        }, 1000);
        setTimeout(() => {
          this.$router.push("/main/home");
        }, 3000);
      }
    }
  },
  filters: {
    formatMallType(mallType) {
      switch (mallType) {
        case "Noodles":
          return "粥粉面饭";
          break;
        case "Popular":
          return "热门畅销";
          break;
        case "Fruit":
          return "水果甜品";
          break;
        case "Drinks":
          return "奶茶饮料";
          break;
        case "Barbecue":
          return "爆香烧烤";
          break;
        case "Hamburger":
          return "汉堡披萨";
          break;
        default:
          return "暂未定义";
          break;
      }
    }
  },
  components: {
    foodItemRecommend,
    foodItem,
    shopCar,
    shopCarInfo,
    corfirmOrder
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
      color: white;
      height: 2vh;
      width: 100%;
      height: 6vh;
      z-index: 9999;
      background: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(rgba(0, 0, 0, 0.4)),
        to(rgba(255, 255, 255, 0))
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
        position: relative;
        color: gray;
        font-size: 0.8rem;
        span {
        }
        .shopDetailButton {
          position: absolute;
          right: 0.5rem;
          bottom: -0.1rem;
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

        padding-bottom: 13rem;
        // vant索引栏
        .indexBar {
          height: 100vh;
          /deep/ .van-index-bar__index {
            background-color: #e6e6fa;
          }
          /deep/ .van-index-bar__sidebar {
            position: sticky;
            top: 6vh;
            left: 0;
            background-color: #6495ed;
            color: gray;
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
          /deep/ .van-index-anchor {
            font-size: 1rem;
            font-weight: 900;
            color: red;
          }
        }
      }
    }
  }
  .shopDetails {
    z-index: 999;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.8);
    .info {
      width: 90%;
      height: 46vh;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: white;
      border-radius: 20px;
      padding: 0.5rem;
      p {
        line-height: 2;
        font-size: 1.2rem;
        color: #606266;
        span:nth-child(1) {
          display: inline-block;
          padding-left: 1rem;
          width: 40%;
        }
      }
    }
  }
  .fullDiv {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 300vh;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>