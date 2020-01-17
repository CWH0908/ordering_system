<template>
  <div class="order">
    <div class="container">
      <div v-show="currentOrderData.length==0" class="noOrder">还没有订单呢，快去选购吧~</div>
      <div class="header">我的订单</div>

      <ul class="outerUl">
        <!-- <li class="header">我的订单</li> -->
        <li v-for="(item,index) in orderData" :key="index" @click="openDetails(item)">
          <div class="orderItem">
            <img :src="getPicUrl(item.shopInfo.pic_url)" alt />
            <div class="rightPart">
              <div class="shopInfo">
                <h3>{{item.shopInfo.shopName}}</h3>
                <p>{{item.buyTime}}</p>
              </div>
              <div class="foodInfo">
                <ul>
                  <li v-for="(foodItem,foodIndex) in item.foodList" :key="foodIndex">
                    <div>
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
                </ul>
              </div>
            </div>
            <div class="operation">
              <!-- <van-button type="danger" size="small">取消订单</van-button> -->
              <van-button type="info" size="small" @click.stop="goShop(item)">再叫一单</van-button>
            </div>
          </div>
        </li>
      </ul>
      <orderDetails
        :orderDataItem="orderDataItem"
        v-if="isShowDetails"
        @closeDetails="closeDetails"
      ></orderDetails>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import orderDetails from "../order/orderDetails";
import { qiniuDomain } from "../../API/qiniuDomain";
export default {
  data() {
    return {
      orderDataItem: {}, //具体的店铺订单对象
      isShowDetails: false //是否显示订单详情
    };
  },
  methods: {
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    //打开订单详情
    openDetails(item) {
      this.orderDataItem = item;
      this.isShowDetails = true;
    },
    //关闭订单详情
    closeDetails() {
      this.isShowDetails = false;
    },
    //再叫一单跳转到店铺
    goShop(item) {
      Toast("正在火速前往店铺");
      setTimeout(() => {
        this.$router.push(`/main/home/${item.shopInfo.shopID}`);
      });
    }
  },
  computed: {
    ...mapGetters(["currentUser","currentOrderData"]),
    // orderData() {
    //   return this.currentUser.orderData;
    // }
    orderData(){
      return this.currentOrderData
    }
  },
  components: {
    orderDetails
  }
};
</script>

<style lang="less" scoped>
.order {
  .container {
    min-height: 100vh;
    padding-top: 4rem;
    padding-bottom: 10vh;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#4169e1),
      to(#b0c4de)
    );
    .noOrder {
      color: white;
      font-size: 1.2rem;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
    .header {
      width: 90%;
      margin: 0 auto;
      position: fixed;
      z-index: 999;
      top: 1rem;
      left: 0;
      right: 0;
      background-color: white;
      height: 6vh;
      line-height: 6vh;
      text-align: center;
      font-size: 1.2rem;
      border-radius: 24px;
    }
    .outerUl {
      // padding-top: 10rem;
    }
    ul {
      padding-top: 1rem;
      li {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 1rem;
        .orderItem {
          background-color: rgba(255, 255, 255, 0.4);
          padding: 1rem 0.5rem;
          border-radius: 10px;
          img {
            float: left;
            width: 15vw;
          }
          .rightPart {
            overflow: hidden;
            min-height: 15vw;
            width: 70vw;
            .shopInfo {
              text-indent: 1rem;
              h3 {
                font-weight: 600;
                padding: 0.5rem 0;
              }
              p {
                color: gray;
                font-size: 0.8rem;
              }
            }
            .foodInfo {
              div {
                .name {
                  display: inline-block;
                  width: 50%;
                  font-weight: normal;
                  font-size: 1rem;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  vertical-align: text-bottom;
                }
                .count {
                  display: inline-block;
                  width: 20%;
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
                  span {
                    font-size: 0.6rem;
                  }
                }
              }
            }
          }
          .operation {
            text-align: right;
            padding-right: 2rem;
          }
        }
      }
    }
  }
}
</style>