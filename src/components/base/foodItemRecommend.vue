<template>
  <div class="foodItemRecommend">
    <img :src="foodItem.pic_url" />
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
          v-model="buyNums"
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
export default {
  props: {
    foodItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      buyNums: 0
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("selectFoodItem",this.foodItem,value);//抛出数量改变的食品的信息，以及最新数量
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