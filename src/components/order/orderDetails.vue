<template>
  <div class="orderDetails" @click="closeDetails">
    <div class="container">
      <div class="foodInfo">
        <ul>
          <li class="headerLi">{{orderDataItem.shopInfo.shopName}}</li>
          <li class="foodLi" v-for="(foodItem,index) in orderDataItem.foodList" :key="index">
            <div>
              <img v-lazy="getPicUrl(foodItem.foodData.pic_url)" alt />
              <p class="name">{{foodItem.foodData.foodName}}</p>
              <p class="count">
                <span>x</span>
                {{foodItem.foodCount}}
              </p>
              <p class="price">
                <span>￥</span>
                {{foodItem.foodData.newMoney}}
              </p>
            </div>
          </li>
          <li class="sendFeeLi">
            <p class="text">蜂鸟专送</p>
            <p class="sendFee">
              <span>￥</span>
              {{orderDataItem.shopInfo.sendFee}}
            </p>
          </li>
          <li class="bottomLi">
            <p class="sumPrice">
              实付&nbsp;
              <span>￥</span>
              {{sumMoney}}
            </p>
          </li>
        </ul>
      </div>
      <div class="addressInfo">
        <ul>
          <li class="headerLi">配送信息</li>
          <li class="addressLi">
            <div>
              <p class="text">收货地址</p>
              <div class="address">
                <p>{{orderDataItem.addressData.address}}</p>
                <p>{{orderDataItem.addressData.name}}</p>
                <p>{{orderDataItem.addressData.tel}}</p>
              </div>
            </div>
          </li>
          <li>
            <div>
              <p class="text">配送方式</p>
              <p class="info">蜂鸟专送</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="orderInfo">
        <ul>
          <li class="headerLi">订单信息</li>
          <li>
            <div>
              <p class="text">支付方式</p>
              <p class="info">{{orderDataItem.payType}}</p>
            </div>
          </li>
          <li>
            <div>
              <p class="text">下单时间</p>
              <p class="info">{{orderDataItem.buyTime}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {qiniuDomain} from "../../API/qiniuDomain"
export default {
  props: {
    orderDataItem: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    closeDetails() {
      this.$emit("closeDetails");
    }
  },
  computed: {
    sumMoney() {
      //计算总金额
      let sumMoney = 0;
      this.orderDataItem.foodList.forEach(foodItem => {
        let itemPrice = foodItem.foodData.newMoney * foodItem.foodCount;
        sumMoney = (Number(sumMoney) + Number(itemPrice)).toFixed(2);
      });
      return sumMoney;
    }
  }
};
</script>

<style lang="less" scoped>
.orderDetails {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
  .container {
    width: 90%;
    background-color: white;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80vh;
    overflow: auto;
    ul {
      li {
        height: 3rem;
        line-height: 3rem;
        border-bottom: 1px solid rgba(176, 196, 222, 0.6);
        padding: 0 1rem;
      }
      .headerLi {
        font-weight: 600;
      }
      .text {
        display: inline-block;
        width: 30%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .info {
        display: inline-block;
        width: 60%;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .foodInfo {
      .foodLi {
        div {
          img {
            vertical-align: middle;
            width: 10vw;
          }
          .name {
            display: inline-block;
            width: 50%;
            font-weight: normal;
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            text-indent: 0.2rem;
          }
          .count {
            display: inline-block;
            width: 10%;
            font-size: 0.8rem;
            color: gray;
            span {
              font-size: 0.6rem;
            }
          }
          .price {
            display: inline-block;
            width: 20%;
            font-size: 0.8rem;
            text-align: right;
            span {
              font-size: 0.6rem;
            }
          }
        }
      }
      .sendFeeLi {
        .text {
          display: inline-block;
          width: 70%;
        }
        .sendFee {
          display: inline-block;
          width: 20%;
          font-size: 0.8rem;
          color: gray;
          text-align: right;
          vertical-align: text-bottom;
          span {
            font-size: 0.6rem;
          }
        }
      }
      .bottomLi {
        .sumPrice {
          float: right;
          display: inline-block;
          color: red;
          span {
            font-size: 0.6rem;
          }
        }
      }
    }
    .addressInfo {
      .addressLi {
        height: 5rem;
      }
      .address {
        display: inline-block;
        width: 60%;
        text-align: right;
        line-height: 2;
        font-size: 0.8rem;
        color: gray;
      }
    }
    .orderInfo {
    }
  }
}
</style>