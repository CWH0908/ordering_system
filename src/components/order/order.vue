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
              <van-button
                type="danger"
                size="small"
                v-if="item.state=='banCancel'||item.state=='waiting'"
                @click.stop="askCancel(item)"
              >取消订单</van-button>
              <van-button
                type="danger"
                size="small"
                disabled
                v-if="item.state=='cancelSuccess'"
              >订单已取消</van-button>
              <van-button type="danger" size="small" disabled v-if="item.state=='cancelFail'">取消被驳回</van-button>
              <van-button
                size="small"
                v-if="item.state=='askCancel'"
                loading
                type="danger"
                loading-text="申请取消中"
              />
              <van-button
                type="primary"
                size="small"
                v-if="item.state=='arrive'&&item.comment==''"
                @click.stop="openCommentBox(item)"
              >评论</van-button>
              <van-button
                type="primary"
                size="small"
                v-if="item.comment!=''&&item.comment!=undefined"
              >已评论</van-button>
              <van-button disabled type="info" size="small" v-if="item.state=='arrive'">已送达</van-button>
              <van-button type="info" size="small" @click.stop="goShop(item)">再叫一单</van-button>
            </div>
          </div>
        </li>
      </ul>

      <!-- 订单详情 -->
      <orderDetails
        :orderDataItem="orderDataItem"
        v-if="isShowDetails"
        @closeDetails="closeDetails"
      ></orderDetails>

      <!-- 评论输入框 -->
      <div class="commentEdit" v-if="isShowCommentBox">
        <div class="edit">
          <p>请对此次订餐打分</p>
          <div class="editText">
            <el-rate v-model="currentRateValue" show-text></el-rate>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="currentComment"></el-input>
          </div>

          <div class="operation">
            <el-button type="danger" @click.stop="closeCommentBox">取消</el-button>
            <el-button type="primary">评论</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapMutations, mapGetters } from "vuex";
import orderDetails from "../order/orderDetails";
import { qiniuDomain } from "../../API/qiniuDomain";
import { updateOrderState } from "../../API/getOrder";
import { Dialog } from "vant";

export default {
  data() {
    return {
      orderDataItem: {}, //具体的店铺订单对象
      isShowDetails: false, //是否显示订单详情
      isShowCommentBox: false, //是否显示评论输入框
      commentOrderItem: {}, //评论的订单对象
      currentRateValue: 0,
      currentComment: ""
    };
  },
  created() {
    setInterval(() => {
      let currentTime = new Date().getTime();
      this.orderData.forEach(orderItem => {
        if (
          new Date().getTime() - Date.parse(orderItem.buyTime) > 600000 &&
          orderItem.state == "waiting"
        ) {
          console.log("超过10min,将state为waiting的设为banCancel");
          // 在vuex中更新
          this.currentOrderData.forEach(item => {
            if (item.orderID == orderItem.orderID) {
              item.state = "banCancel";
            }
          });
          this.set_currentOrderData(this.currentOrderData);

          // 在数据库中更新
          this._updateOrderState(orderItem, "banCancel");
        }

        //
        if (
          new Date().getTime() - Date.parse(orderItem.buyTime) > 3600000 &&
          (orderItem.state == "waiting" ||
            orderItem.state == "cancelFail" ||
            orderItem.state == "banCancel")
        ) {
          console.log("超过1个钟,将state设为arrive");
          // 在vuex中更新
          this.currentOrderData.forEach(item => {
            if (item.orderID == orderItem.orderID) {
              item.state = "arrive";
            }
          });
          this.set_currentOrderData(this.currentOrderData);

          // 在数据库中更新
          this._updateOrderState(orderItem, "arrive");
        }
      });
    }, 1000);
  },
  methods: {
    ...mapMutations({
      set_currentOrderData: "set_currentOrderData"
    }),
    //在数据库中更新订单的状态信息
    async _updateOrderState(orderItem, state) {
      await updateOrderState(orderItem, state);
    },
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
    },
    //申请取消订单
    askCancel(item) {
      Dialog.confirm({
        title: "提示",
        message: "是否申请取消该订单?"
      })
        .then(() => {
          //首先判断是否超过 30分钟(时间戳 1秒 =8000 )，超过30分钟不可取消订单，并设为 已送达
          if (item.state == "banCancel") {
            Toast("订单超过10分钟，不可取消");
          } else {
            //判断未超时的状态
            if (new Date().getTime() - Date.parse(item.buyTime) > 1800000) {
              this._updateOrderState(item, "banCancel");
              Toast("订单超过10分钟，不可取消");
            } else {
              console.log(
                item.orderID,
                "：申请取消订单，在vuex,数据库中更新其数据为askCancel"
              );

              //在vuex中更新订单信息
              this.currentOrderData.forEach(orderItem => {
                if (orderItem.orderID == item.orderID) {
                  orderItem.state = "askCancel";
                }
              });
              this.set_currentOrderData(this.currentOrderData);

              //数据库中更新
              this._updateOrderState(item, "askCancel");

              Toast("已申请取消该订单");
            }
          }
        })
        .catch(() => {});
    },
    //打开评论输入框
    openCommentBox(item) {
      this.isShowCommentBox = true;
      this.commentOrderItem = item;
    },
    //关闭评论输入框
    closeCommentBox() {
      this.isShowCommentBox = false;
      this.currentRateValue = 0;
      this.currentComment = "";
    }
  },
  computed: {
    ...mapGetters(["currentUser", "currentOrderData"]),
    // orderData() {
    //   return this.currentUser.orderData;
    // }
    orderData() {
      return this.currentOrderData.reverse();
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

    //评论输入框
    .commentEdit {
      position: fixed;
      top: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 999;
      .edit {
        width: 90%;
        height: 60vh;
        background-color: white;
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: 80vh;
        overflow: auto;
        border-radius: 10px;
        p {
          line-height: 3;
          font-size: 1.2rem;
          text-align: center;
          color: #909399;
        }
        .editText {
          /deep/ .el-rate {
            height: 5vh;
            line-height: 5vh;
            padding-left: 1rem;
            /deep/ .el-rate__item {
            }
            /deep/ .el-rate__text {
              vertical-align: text-bottom;
            }
          }
          /deep/ .el-textarea {
            textarea {
              height: 25vh;
              width: 90%;
              margin: 0 auto;
            }
          }
        }
        .operation {
          /deep/ .el-button {
            display: block;
            width: 90%;
            margin: 1rem auto;
          }
        }
      }
    }
  }
}
</style>