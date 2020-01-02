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
          <van-collapse-item title="选择收货地址" name="1" :value="sendAddress">
            <div>地址一</div>
            <div>地址二</div>
            <div>地址三</div>
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
            <li v-for="(item,index) in currentShopCar" :key="index">{{item.foodData.foodName}}</li>
          </ul>
        </van-panel>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomeShoplist } from "../../API/getHomeFoodList";
import { mapGetters } from "vuex";

export default {
  created() {
    this.shopID = this.$route.params.id;
    this._getShoplist();
  },
  data() {
    return {
      shopID: -1,
      shopInfo: {}, //店铺信息
      activeNames: ["0"], //折叠面板
      payRadio: "支付宝", //单选框支付方式
      sendAddress: "" //配送地址
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleChange(val) {
      // console.log(val);
    },
    //请求店铺信息
    async _getShoplist() {
      this.shopInfo = await getHomeShoplist(this.shopID);
    }
  },
  computed: {
    ...mapGetters(["all_shop_car"]),
    //当前店铺的购物车信息
    currentShopCar() {
      let newArr = [];
      this.all_shop_car.forEach(shopItem => {
        if (shopItem.shopID == this.shopID) {
          newArr = shopItem.shopCar;
        }
      });
      return newArr;
    }
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
    }
    .orderInfo {
      width: 90%;
      margin: 0 auto;
      margin-top: 1rem;
    }
  }
}
</style>