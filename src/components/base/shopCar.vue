<template>
  <div class="shopCar">
    <div class="icon">
      <i class="el-icon-shopping-cart-2"></i>
    </div>
    <div class="currentMoney">
      <div>{{currentMoney}}</div>
      <div class="sendFee" v-if="shopInfo.sendFee">另需配送费{{shopInfo.sendFee}}元</div>
    </div>
    <div class="goSettlement">
      <span v-if="shopInfo.startFee">￥{{shopInfo.startFee}}起送</span>
      <el-button v-else type="success" disabled>去结算</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      currentMoney: "未选购商品",
      currentShopCar: [] //当前购物车信息
    };
  },
  mounted() {
    this.$nextTick(function() {
      console.log(this.shopInfo);
      console.log(this.all_shop_car);
    });
  },
  props: {
    shopInfo: {
      type: Object,
      default: () => {} //商家信息，含配送费和起送价
    }
  },
  computed: {
    ...mapGetters(["all_shop_car"])
  },
  watch: {
    all_shop_car(newVal) {
      console.log(this.shopInfo);
      newVal.forEach(shopItem => {
        if (shopItem.shopID == this.shopInfo.shopID) {
          this.currentShopCar = shopItem.shopCar; //当前购物车信息
        }
      });
    },
    currentShopCar(newVal) {
      if (newVal.length == 0) {
        this.currentMoney = "未选购商品";
      } else {
        newVal.forEach(foodItem => {
          this.currentMoney =
            this.currentMoney + foodItem.foodPrice * foodItem.foodCount;
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.shopCar {
  position: fixed;
  bottom: -1px;
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
      color: #e1ffff;
    }
  }
  .goSettlement {
    width: 20%;
    display: inline-block;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>