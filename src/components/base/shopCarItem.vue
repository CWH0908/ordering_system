<template>
  <div class="shopCarItem">
    <ul>
      <li>已选商品</li>
      <li v-for="(item,index) in shopCarFoodList" :key="index">
        <div class="foodName">{{item.foodName}}</div>
        <div class="foodSumPrice">
          <span>￥</span>
          {{item|getSumPrice}}
        </div>
        <el-input-number
          class="inputNum"
          v-model="item.foodCount"
          size="mini"
          @change="handleChange"
          :min="0"
          label="描述文字"
        ></el-input-number>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shopCarFoodList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleChange(value) {
      //   this.currentBuyNums = value;
      //通知父组件selectType修改
      this.$emit("selectFoodItem", this.foodItem, value); //抛出数量改变的食品的信息，以及最新数量
    }
  },
  filters: {
    getSumPrice(item) {
      return (item.foodCount * item.newMoney).toFixed(2);
    }
  }
};
</script>

<style lang="less" scoped>
.shopCarItem {
  ul {
    li {
      position: relative;
      width: 100%;
      padding: 0 1rem;
      height: 3rem;
      line-height: 3rem;
      border-top: 1px solid gray;
      box-sizing: border-box;
      .foodName {
        display: inline-block;
        width: 50%;
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
        right: 1rem;
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
    li:nth-child(1) {
      background-color: #d8bfd8;
      color: gray;
    }
  }
}
</style>