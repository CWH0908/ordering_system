<template>
  <div class="confirmOrder">
    <div class="container">
      <!-- 头部返回 -->
      <header>
        <div class="goBackPart">
          <span @click="goBack">
            <i class="el-icon-arrow-left"></i>
          </span>
          <h4>确认订单</h4>
        </div>
      </header>

      <!-- 地址，支付 -->
      <div class="operation">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="选择收货地址" name="1" :value="sendAddress.address">
            <div class="addressListPart">
              <addressList @onClickItem="onClickItem"></addressList>
            </div>
          </van-collapse-item>
          <van-collapse-item title="支付方式" name="2" :value="payRadio">
            <van-radio-group v-model="payRadio">
              <van-radio name="支付宝">支付宝</van-radio>
              <van-radio name="微信支付">微信支付</van-radio>
            </van-radio-group>
          </van-collapse-item>
        </van-collapse>
      </div>

      <!-- 订单信息 -->
      <div class="orderInfo">
        <van-panel :title="shopInfo.shopName">
          <ul>
            <li class="confirmOrderItem" v-for="(item,index) in currentShopCar" :key="index">
              <div>
                <img :src="getPicUrl(item.foodData.pic_url)" alt />
                <span class="foodName">{{item.foodData.foodName}}</span>
                <span class="foodCount">x {{item.foodCount}}</span>
                <div class="newMoney">
                  <span>￥</span>
                  {{item.foodData.newMoney}}
                </div>
              </div>
            </li>
            <li class="sendPart">
              <span class="sendInfo">配送费·蜂鸟专送</span>
              <div class="sendFee">
                <span>￥</span>
                {{shopInfo.sendFee}}
              </div>
            </li>
            <li class="sumPricePart">
              <span class="emptySpan"></span>
              <span class="text">小计</span>
              <div class="sumPrice">
                <span>￥</span>
                <div>{{sumMoney}}</div>
              </div>
            </li>
          </ul>
        </van-panel>
      </div>

      <!-- 底部结算按钮 -->
      <div class="settlement">
        <span>￥{{sumMoney}}</span>
        <el-button class="settlementButton" type="success" @click.stop="settlement">确认支付</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeShoplist } from "../../API/getHomeFoodList";
import { mapMutations, mapGetters } from "vuex";
import addressList from "../base/addressList";
import { updateOrder } from "../../API/checkUser";
import { Toast } from "vant";
import { qiniuDomain } from "../../API/qiniuDomain"; //七牛云外链

export default {
  created() {
    this.shopID = this.$route.params.id;
    this._getShoplist();
    if (this.currentUser.addressData.length > 0) {
      this.sendAddress = this.currentUser.addressData[0];
    }
  },
  data() {
    return {
      shopID: -1,
      shopInfo: {}, //店铺信息
      activeNames: ["0"], //折叠面板
      payRadio: "支付宝", //单选框支付方式
      sendAddress: {} //配送地址
    };
  },
  methods: {
    ...mapMutations({
      set_all_shop_car: "set_all_shop_car",
      set_currentUser: "set_currentUser"
    }),
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    goBack() {
      this.$router.go(-1);
    },
    handleChange(val) {
      // console.log(val);
    },
    //请求店铺信息
    async _getShoplist() {
      this.shopInfo = await getHomeShoplist(this.shopID);
    },
    //结算按钮
    settlement() {
      if (JSON.stringify(this.sendAddress) == "{}") {
        Toast("请添加收货地址");
      } else {
        const toast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: "正在支付"
        });

        let second = 3;
        const timer = setInterval(() => {
          second--;
          if (second) {
            toast.message = `正在支付`;
          } else {
            clearInterval(timer);
            // 手动清除 Toast
            Toast.clear();
          }
        }, 1000);
        setTimeout(() => {
          Toast("支付成功");
          //结算成功将vuex中currentUser的当前购物车addressData特定店铺清空，同时在currentUser的orderData中新增一条数据
          this.all_shop_car.forEach(shopItem => {
            if (shopItem.shopID == this.shopID) {
              let newObj = {};
              // newObj.shopID = this.shopID;
              newObj.shopInfo = this.shopInfo;
              newObj.userAccount = this.currentUser.userAccount;
              newObj.foodList = shopItem.shopCar;
              newObj.addressData = this.sendAddress;
              newObj.payType = this.payRadio;
              newObj.buyTime = this.getCurrentTime();
              this.currentUser.orderData.push(newObj);
              this.set_currentUser(this.currentUser);

              //存储好订单后清空此店铺购物车
              shopItem.shopCar = [];
            }
          });
          //数据库更新数据
          updateOrder(
            this.currentUser.userAccount,
            JSON.stringify(this.currentUser.orderData)
          );
        }, 3000);

        //跳转到订单组件
        setTimeout(() => {
          this.$router.push({ path: "/main/order" });
        }, 4000);
      }
    },
    //获取当前时间
    getCurrentTime() {
      let time = new Date();
      let years = time.getFullYear();
      let months = this.formatTime(time.getMonth() + 1);
      let days = this.formatTime(time.getDate());
      let hours = this.formatTime(time.getHours());
      let minutes = this.formatTime(time.getMinutes());
      let seconds = this.formatTime(time.getSeconds());
      return `${years}-${months}-${days} ${hours}:${minutes}:${seconds}`;
    },
    formatTime(str) {
      str = str.toString();
      str = str.length == 1 ? "0" + str : str;
      return str;
    },
    //选择地址
    onClickItem(item, index) {
      this.sendAddress = JSON.parse(JSON.stringify(item));
    }
  },
  computed: {
    ...mapGetters(["all_shop_car", "currentUser"]),
    //默认配送地址
    // 此方式绑定了currentUser值，无法通过点击地址信息来设置，因此换成普通的初始化方式
    // sendAddress: {
    //   get() {
    //     return this.currentUser.addressData[0];
    //   },set(){}
    // },
    //当前店铺的购物车信息
    currentShopCar() {
      let newArr = [];
      this.all_shop_car.forEach(shopItem => {
        if (shopItem.shopID == this.shopID) {
          newArr = shopItem.shopCar;
        }
      });
      if (newArr.length == 0) {
        //被刷新过页面，重新回到
        // this.$router.push({ path: `/main/home/${this.shopID}` });
      } else {
        return newArr;
      }
    },
    sumMoney() {
      //计算总金额
      let sumMoney = 0;
      this.all_shop_car.forEach(shopItem => {
        if (shopItem.shopID == this.shopID) {
          shopItem.shopCar.forEach(foodItem => {
            let itemPrice = foodItem.foodData.newMoney * foodItem.foodCount;
            sumMoney = (Number(sumMoney) + Number(itemPrice)).toFixed(2);
          });
        }
      });
      return sumMoney;
    }
  },
  components: {
    addressList
  }
};
</script>

<style lang="less" scoped>
.confirmOrder {
  z-index: 9999;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  .container {
    height: 100%;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#4169e1),
      to(#b0c4de)
    );
    header {
      .goBackPart {
        // position: fixed;
        // top: 0;
        height: 2vh;
        width: 100%;
        height: 8vh;
        z-index: 9999;
        span {
          font-size: 2rem;
          width: 20%;
        }
        h4 {
          display: inline-block;
          text-align: center;
          width: 80%;
          font-weight: normal;
        }
      }
    }
    .operation {
      width: 90%;
      margin: 0 auto;
      //   margin-top: 6vh;
      /deep/ .van-radio:nth-child(1) {
        margin-bottom: 1rem;
      }
      .addressListPart {
      }
    }
    .orderInfo {
      width: 90%;
      margin: 0 auto;
      margin-top: 1rem;
      /deep/ .van-panel {
        overflow: auto;
        max-height: 61vh;
        /deep/ .van-panel__header {
          position: sticky;
          top: 0;
        }
      }
      ul {
        padding: 1rem 0;
        .confirmOrderItem {
          padding: 0 1rem;
          margin-bottom: 1rem;
          img {
            width: 10vw;
            height: 10vw;
            vertical-align: middle;
          }
          .foodName {
            display: inline-block;
            width: 40%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .foodCount {
            display: inline-block;
            width: 23%;
          }
          .newMoney {
            display: inline-block;
            width: 20%;
          }
        }
        .sendPart {
          padding: 0 1rem;
          margin-bottom: 1rem;
          .sendInfo {
            display: inline-block;
            width: 78%;
          }
          .sendFee {
            span {
              font-size: 0.8rem;
            }
            display: inline-block;
            width: 20%;
          }
        }
        .sumPricePart {
          margin-top: 2rem;
          .emptySpan {
            display: inline-block;
            width: 58%;
          }
          .text {
            display: inline-block;
          }
          .sumPrice {
            display: inline-block;
            span {
              font-size: 0.8rem;
            }
            div {
              display: inline-block;
              width: 4rem;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
    .settlement {
      position: fixed;
      bottom: 0;
      width: 100%;
      display: inline-block;
      background-color: #2f4f4f;
      span {
        display: inline-block;
        padding: 0.5rem 1rem;
      }
      color: white;
      .settlementButton {
        float: right;
        padding: 12px 20px;
      }
    }
  }
}
</style>