<template>
  <div class="sortType">
    <ul>
      <li class="itemLi" v-for="(item,index) in shopList" :key="index" @click="selectShop(item)">
        <div class="itemDiv">
          <!-- 店铺头像 -->
          <aside>
            <img :src="getPicUrl(item.pic_url)" class="itemPic" />
          </aside>
          <div class="rightPart">
            <!-- 店铺名 -->
            <h1>{{item.shopName}}</h1>
            <!-- 店铺销量信息 -->
            <div class="selfInfo">
              <el-rate
                :value="getShopRateValue(item)"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <span>月售 {{item.saleTimes}} 单</span>
            </div>
            <!-- 店铺基础费用，起送、配送费 -->
            <div class="baseFee">
              <span>￥{{item.startFee}}起送</span>
              <span class="fenge">&nbsp;|&nbsp;</span>
              <span>配送费 ￥{{item.sendFee}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <transition name="slide-left">
      <router-view name="foodList"></router-view>
    </transition>
  </div>
</template>

<script>
import { qiniuDomain } from "../../API/qiniuDomain";
import { getAllShopOrder } from "../../API/getOrder";
import { mapMutations, mapGetters } from "vuex";
import { updateShopRateValue } from "../../API/getHomeRecommend";

export default {
  props: {
    shopList: {
      type: Array,
      default: () => []
    }
  },
  beforeCreate() {
    // this._getAllShopOrder();
  },
  methods: {
    ...mapMutations({
      set_allShopOrderData: "set_allShopOrderData"
    }),
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    selectShop(item) {
      // alert("选择了店铺ID："+item.shopID)
      this.$router.push({
        name: "foodList",
        params: {
          id: item.shopID
        }
      });
    },

    //计算得出店铺的评分
    getShopRateValue(shopItem) {
      let newArr = [];
      let rateValueSum = 0;
      let currentShopID = shopItem.shopID; //拿到当前的店铺ID
      let currentShopOrderData = []; //当前店铺订单数组
      //根据店铺ID，查找属于该店铺的订单
      this.allShopOrderData.forEach(orderItem => {
        if (orderItem.shopID == shopItem.shopID) {
          currentShopOrderData.push(orderItem);
        }
      });

      if (
        currentShopOrderData.length == 0 ||
        currentShopOrderData == undefined
      ) {
        updateShopRateValue(shopItem.shopID, 0);

        return 0;
      } else {
        //根据订单，计算出评分
        currentShopOrderData.forEach(orderItem => {
          if (
            orderItem.state == "arrive" &&
            orderItem.rateValue != 0 &&
            orderItem.comment != ""
          ) {
            rateValueSum += orderItem.rateValue;
            newArr.push(orderItem);
          }
        });
        let temp = (rateValueSum / newArr.length).toFixed(1);

        //重新设置此店铺的信息，即更新rateValue评论的分数
        updateShopRateValue(shopItem.shopID, Number(temp));

        return Number(temp);
      }
    }
  },
  computed: {
    ...mapGetters(["allShopOrderData"])
  }
};
</script>

<style lang="less" scoped>
//每个店铺的样式
.sortType {
  ul {
    padding-bottom: 6vh;
    .itemLi {
      padding-left: 1rem;
      margin-bottom: 1rem;
      .itemDiv {
        aside {
          width: 20%;
          display: inline-block;
          .itemPic {
            width: 20vw;
            height: 20vw;
          }
        }
        .rightPart {
          padding-left: 1rem;
          display: inline-block;
          color: gray;
          h1 {
            line-height: 2.5;
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
          }
          .selfInfo {
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            /deep/ .el-rate {
              display: inline-block;
              margin-right: 0.2rem;
              vertical-align: middle;
              .el-rate__icon {
                font-size: 8px;
                margin-right: 2px;
              }
            }
          }
          .baseFee {
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .fenge {
              color: rgba(0, 0, 0, 0.2);
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter-active {
  transition: all 200ms;
}

.slide-left-leave-to {
  opacity: 0;
  transition: translateX(-100%);
}
</style>