<template>
  <div class="shopCar" @click="toggleShopCar">
    <div class="icon" :style="showColor">
      <i class="el-icon-shopping-cart-2"></i>
    </div>
    <div class="currentMoney">
      <div :style="showMoney">
        <span v-if="currentMoney>shopInfo.startFee">￥</span>
        {{currentMoney}}
      </div>
      <div class="sendFee" v-if="shopInfo.sendFee">另需配送费{{shopInfo.sendFee}}元</div>
    </div>
    <div class="goSettlement">
      <span v-if="!isShowButton">￥{{shopInfo.startFee}}起送</span>
      <el-button class="settlementButton" v-else type="success" @click.stop="goSettlement">去结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isShowButton: false, //超过起送费，显示结算按钮
      showMoney: "", //超过起送价后的一些样式变化
      showColor: ""
    };
  },
  props: {
    shopInfo: {
      type: Object,
      default: () => {} //商家信息，含配送费和起送价
    }
  },

  computed: {
    ...mapGetters(["all_shop_car"]),

    currentShopCar() {
      for (let shopItem in this.all_shop_car) {
        if (this.all_shop_car[shopItem].shopID == this.shopInfo.shopID) {
          return this.all_shop_car[shopItem].shopCar;
        }
      }
    },

    currentMoney() {
      if (this.currentShopCar) {
        if (this.currentShopCar.length == 0) {
          this.showMoney = "";
          this.showColor = "";
          return "未选购商品";
        } else {
          let sum = 0;
          this.currentShopCar.forEach(foodItem => {
            sum += foodItem.foodData.newMoney * foodItem.foodCount;
          });

          //超过起送价后的样式变化
          this.showMoney = "color:white;";
          this.showColor = "color:#6495ED";
          return sum.toFixed(2);
        }
      }
    }
  },

  watch: {
    currentMoney(newVal) {
      //总金额超过起送费，允许结算
      if (Number(newVal) > this.shopInfo.startFee) {
        this.isShowButton = true;
      } else {
        this.isShowButton = false;
      }
    }
  },

  methods: {
    goSettlement() {
    //   alert("结算：￥" + this.currentMoney + "元");
      this.$emit("goSettlement",this.currentMoney);
    },
    toggleShopCar(){
        this.$emit("toggleShopCar")
    }
  }
};
</script>

<style lang="less" scoped>
.shopCar {
  position: fixed;
  bottom: -1px;
  height: 6.5vh;
  width: 100%;
  background-color: #2f4f4f;
  color: gray;
  z-index: 999;
  padding: 0.2rem 0;
  .icon {
    display: inline-block;
    position: absolute;
    left: 1rem;
    font-size: 2.2rem;
  }
  .currentMoney {
    width: 60%;
    display: inline-block;
    padding-left: 4rem;
    line-height: 1.5;
    .sendFee {
      font-size: 0.6rem;
      color: gray;
    }
  }
  .goSettlement {
    width: 20%;
    display: inline-block;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);

    .settlementButton {
      float: right;
      padding: 12px 20px;
    }
  }
}
</style>