<template>
  <div class="foodItemRecommend">
    <img :src="getPicUrl(foodItem.pic_url)" />
    <div class="foodData">
      <h1>{{foodItem.foodName}}</h1>
      <div>
        <span style="font-size:0.6rem;color:red;">￥</span>
        <span class="foodPrice">{{foodItem.newMoney}}</span>
        &nbsp;&nbsp;&nbsp;
        <span class="saleTimes">月售{{foodItem.saleTimes}}</span>
      </div>
      <div>
        <el-input-number
          class="addCar"
          v-model="currentBuyNums"
          :data-foodid="foodItem.foodID"
          size="mini"
          @change="handleChange"
          :min="0"
          label="描述文字"
        ></el-input-number>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {qiniuDomain} from "../../API/qiniuDomain"

export default {
  props: {
    foodItem: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(["all_shop_car"]),
    currentBuyNums: {
      get() {
        for (let i in this.all_shop_car) {
          //首先找到店铺
          if (this.all_shop_car[i].shopID == this.foodItem.shopID) {
            if (this.all_shop_car[i].shopCar.length == 0) {
              return 0;
            } else {
              for (let j in this.all_shop_car[i].shopCar) {
                if (
                  this.all_shop_car[i].shopCar[j].foodData.foodID ==
                  this.foodItem.foodID
                ) {
                  //返回在vuex中的购物车计数器的值
                  return this.all_shop_car[i].shopCar[j].foodCount;
                }
              }
              return 0;
            }
          }
        }
      },
      set(value) {}
    }
  },
  methods: {
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    handleChange(value) {
      this.currentBuyNums = value;
      //通知父组件selectType修改
      this.$emit("selectFoodItem", this.foodItem, value); //抛出数量改变的食品的信息，以及最新数量
    }
  }
};
</script>

<style lang="less" scoped>
.foodItemRecommend {
  position: relative;
  text-align: left;
  height: 32vh;
  img {
    width: 100%;
    height: 8rem;
    display: block;
  }
  .foodData {
    padding: 0 0.5rem;
    h1 {
      font-size: 0.8rem;
      font-size: 1rem;
      padding: 0.2rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .saleTimes {
      position: absolute;
      right: 0.6rem;
      font-size: 0.6rem;
      color: gray;
      padding: 0.2rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .foodPrice {
      color: red;
      font-size: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .addCar {
      position: absolute;
      bottom: 0.1rem;
      left: 0;
      transform: translateX(8%);
    }
    div /deep/ .el-input-number__decrease,
    div /deep/.el-input-number--mini .el-input-number__increase {
      font-size: 22px;
      background: #6495ed !important;
      color: white !important;
      font-weight: 900;
    }
  }
}
</style>