<template>
  <div class="foodItem">
    <img :src="foodItem.pic_url" />
    <div class="foodData">
      <h1>{{foodItem.foodName}}</h1>
      <div>
        <span class="saleTimes">{{foodItem.foodInfo}}</span>
        <span class="saleTimes">月售：{{foodItem.saleTimes}}</span>
      </div>
    </div>
    <div class="addPart">
      <span style="font-size:0.6rem;color:red;">￥</span>
      <span class="foodPrice">{{foodItem.newMoney}}</span>
      &nbsp;&nbsp;&nbsp;
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
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    foodItem: {
      type: Object,
      default: () => {}
    },
    buyNums: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      //转存父组件的传值，使用$emit实现父子组件的双向通信
      currentBuyNums: this.buyNums
    };
  },
  computed: {
    ...mapGetters(["all_shop_car"])
  },
  methods: {
    handleChange(value) {
      this.currentBuyNums = value;
      //通知父组件selectType修改
      this.$emit("selectFoodItem", this.foodItem, value); //抛出数量改变的食品的信息，以及最新数量
    }
  }
};
</script>

<style lang="less" scoped>
.foodItem {
  position: relative;
  text-align: left;
  overflow: hidden;
  height: 17vh;
  img {
    width: 27vw;
    display: block;
    float: left;
  }
  .foodData {
    padding: 0 0.8rem;
    overflow: hidden;
    h1 {
      font-size: 0.8rem;
      font-size: 1rem;
      padding: 0.2rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .saleTimes {
      right: 0.6rem;
      font-size: 0.6rem;
      color: gray;
      padding: 0.2rem 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .addPart {
    overflow: hidden;
    padding: 0 0.8rem;
    .foodPrice {
      color: red;
      font-size: 1rem;
      width: 1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .addCar {
      position: absolute;
      right: 0rem;
    }
    /deep/ .el-input-number__decrease,
    /deep/.el-input-number--mini .el-input-number__increase {
      font-size: 12px !important;
      background: #6495ed !important;
      color: white !important;
      font-weight: 900;
    }
    /deep/ .el-input--mini .el-input__inner {
      height: 23px;
      line-height: 23px;
    }
    /deep/.el-input-number--mini {
      width: 100px;
      line-height: 22px;
    }
  }
}
</style>