<template>
  <div class="order">
    <div class="container">
      <div v-show="currentUser.orderData.length==0" class="noOrder">还没有订单呢，快去选购吧~</div>
      <ul>
        <li v-for="(item,index) in orderData" :key="index">
          <div class="orderItem">
            <img :src="item.shopInfo.pic_url" alt />
            <div class="rightPart">
              <div class="shopInfo">
                <h3>{{item.shopInfo.shopName}}</h3>
                <p>{{item.buyTime}}</p>
              </div>
              <div class="foorInfo">
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
            <van-button type="info" size="mini">取消订单</van-button>
            <van-button type="info" size="mini">再叫一单</van-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters(["currentUser"]),
    orderData() {
      return this.currentUser.orderData;
    }
  }
};
</script>

<style lang="less" scoped>
.order {
  .container {
    height: 100vh;
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
    ul {
      padding-top: 1rem;
      li {
        width: 90%;
        margin: 0 auto;
        margin-bottom: 1rem;
        .orderItem {
          background-color: white;
          padding: 1rem 0.5rem;
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
            .foorInfo {
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
        }
      }
    }
  }
}
</style>