<template>
  <div class="hello">
    <!-- <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart> -->

    <van-index-bar
      class="indexBar"
      :index-list="indexList"
      highlight-color="#6495ed"
      :sticky="false"
    >
      <van-cell class="vantCell">
        <div v-for="(index0) in indexList" :key="index0">
          <van-index-anchor :index="index0">{{index0}}</van-index-anchor>
          <!-- <div v-for="(item,index1) in groupFoodList[index0]" :key="index1">
            <foodItem :foodItem="item" @selectFoodItem="selectFoodItem"></foodItem>
          </div>-->
        </div>
      </van-cell>
    </van-index-bar>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      orgOptions: {},
      indexList: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
      stickyHeight: "height:" + 9 * 17 + "vh"
    };
  },
  mounted() {
    this.orgOptions = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          //   type: "line",
          type: "bar",
          smooth: true
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
// vant索引栏
.indexBar {
  height: 100vh;
  /deep/ .van-index-bar__index {
  }
  /deep/ .van-index-bar__sidebar {
    position: sticky;
    top: 6vh;
    left: 0;
    color: gray;
    width: 20vw;
    height: 0;
    span {
      padding: 1rem 0;
      border: 1px solid gray;
    }
  }
  /deep/ .van-index-bar__index--active {
    background-color: #6188fc !important;
    color: yellow !important;
  }
}
.vantCell {
  float: right;
  width: 80vw;
  padding: 0 16px;
  padding-bottom: 3rem;
  /deep/ .van-index-anchor {
    font-size: 1rem;
    font-weight: 900;
    color: red;
  }
}
</style>