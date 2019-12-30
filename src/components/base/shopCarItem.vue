<template>
  <div class="shopCarItem">
    <div class="foodName">{{shopCarFoodItem.foodName}}</div>
    <div class="foodSumPrice">
      <span>￥</span>
      {{shopCarFoodItem|getSumPrice}}
    </div>
    <el-input-number
      class="inputNum"
      v-model="shopCarFoodItem.foodCount"
      size="mini"
      @change="handleChange"
      :min="0"
      label="描述文字"
    ></el-input-number>
  </div>
</template>

<script>
export default {
  props: {
    shopCarFoodItem: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleChange(value) {
      //   this.currentBuyNums = value;
      //通知父组件selectType修改
      this.$emit("selectFoodItem", this.shopCarFoodItem, value); //抛出数量改变的食品的信息，以及最新数量
    }
  },
  filters: {
    getSumPrice(shopCarFoodItem) {
      return (shopCarFoodItem.foodCount * shopCarFoodItem.newMoney).toFixed(2);
    }
  }
};
</script>

<style lang="less" scoped>
.shopCarItem {
  position: relative;
  width: 100%;
  padding: 0 1rem;
  height: 3rem;
  line-height: 3rem;
  border-top: 1px solid gray;
  box-sizing: border-box;
  .foodName {
    display: inline-block;
    width: 40%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .foodSumPrice {
    display: inline-block;
    overflow: hidden;
    color: red;
    span {
      font-size: 0.6rem;
    }
  }
  .inputNum {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    /deep/ .el-input-number__decrease,
    /deep/ .el-input-number__increase {
      font-size: 12px !important;
      background: #6495ed !important;
      color: white !important;
      font-weight: 900;
    }
    /deep/ .el-input--mini .el-input__inner {
      height: 23px;
      line-height: 23px;
    }
  }
  /deep/ .el-input-number--mini {
    width: 100px;
    line-height: 22px;
  }
}
</style>