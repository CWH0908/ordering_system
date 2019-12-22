<template>
  <div class="foodItem">
    <img :src="foodItem.pic_url" />
    <div class="foodData">
      <h1>{{foodItem.foodName}}</h1>
      <div>
        <span class="saleTimes">主要原料：{{foodItem.foodInfo}}</span>
        &nbsp;&nbsp;&nbsp;
        <span class="saleTimes">月售：{{foodItem.saleTimes}}</span>
      </div>
    </div>
    <div class="addPart">
      <span style="font-size:0.6rem;color:red;">￥</span>
      <span class="foodPrice">{{foodItem.newMoney}}</span>
      <el-input-number
        class="addCar"
        v-model="buyNums"
        size="mini"
        @change="handleChange"
        :min="0"
        label="描述文字"
      ></el-input-number>
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
      buyNums: 0,
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="less" scoped>
.foodItem {
  position: relative;
  text-align: left;
  overflow: hidden;
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
      font-size: 1.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .addCar {
      position: absolute;
      right: 0.5rem;
    }
    /deep/ .el-input-number__decrease,
    /deep/.el-input-number--mini .el-input-number__increase {
      font-size: 22px;
      background: #6495ed !important;
      color: white !important;
      font-weight: 900;
    }
  }
}
</style>