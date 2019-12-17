<template>
  <div class="recommend">
    <p class="hotMall">-畅销店铺-</p>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="综合排序" name="first">
        <shopList :shopList="sortList"></shopList>
      </el-tab-pane>
      <el-tab-pane label="销量排序" name="second">
        <shopList :shopList="sortList"></shopList>
      </el-tab-pane>
      <el-tab-pane label="好评优先" name="third">
        <shopList :shopList="sortList"></shopList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getHomeRecommend } from "../../API/getHomeRecommend";
import shopList from "../../components/home/shopList";
export default {
  data() {
    return {
      activeName: "first", //初始选择板块
      requireAllShopList: [], //从API接口拿到的所有店铺数据
      sortList: [] //默认综合排序的数据
    };
  },
  created() {
    this._getHomeRecommend();
  },
  methods: {
    handleClick(tab, event) {
      //切换排序类型
      // console.log(tab, event);
    },
    //API获取所有店铺数据
    async _getHomeRecommend() {
      await getHomeRecommend().then(res => {
        delete res[0]._id; //移除数据库自带的_id属性
        let formatData = this.formatShopList(res[0]);
        this.requireAllShopList = formatData;
        // this.sortList = formatData;
      });
    },
    //将请求回来的数据进行格式化转换成所需格式
    formatShopList(shopList) {
      let newArr = [];
      for (let item in shopList) {
        newArr.push(shopList[item]);
      }
      return newArr;
    },
    //按排序方式将店铺数组进行排序
    sortFunc(oldShopList, sortType) {
      //快速排序，传入数据和排序方式
      this.sortList = this.quickSort(oldShopList, sortType);
    },

    //快速排序
    quickSort(arr, sortType) {
      if (arr.length < 1) {
        return arr;
      }
      var pivotIndex = Math.floor(arr.length / 2); //找到那个基准数
      var tempValue = JSON.parse(JSON.stringify(arr[pivotIndex]));
      var left = [];
      var right = [];

      //综合排序，比较麻烦，需要结合评价和销量进行判断然后排序
      if (sortType == "multiple") {
        let valueSum = JSON.parse(JSON.stringify(arr.splice(pivotIndex, 1)[0]));
        var pivot = valueSum.saleTimes * 0.06 + valueSum.rateValue * 60; //取出基准数，并去除，splice返回值为数组。
        for (var i = 0; i < arr.length; i++) {
          let currentItem = JSON.parse(JSON.stringify(arr[i]));
          if (currentItem.saleTimes * 0.06 + currentItem.rateValue * 60 > pivot) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }
      }
      //评价排序
      else if (sortType == "sales") {
        var pivot = arr.splice(pivotIndex, 1)[0].saleTimes; //取出基准数，并去除，splice返回值为数组。
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].saleTimes > pivot) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }
      }
      //评价排序
      else if (sortType == "comment") {
        var pivot = arr.splice(pivotIndex, 1)[0].rateValue; //取出基准数，并去除，splice返回值为数组。
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].rateValue > pivot) {
            left.push(arr[i]);
          } else {
            right.push(arr[i]);
          }
        }
      }
      return this.quickSort(left, sortType).concat(
        [tempValue],
        this.quickSort(right, sortType)
      ); //加入基准数
    }
  },
  watch: {
    activeName(newVal) {
      let _requireAllShopList = JSON.parse(
        JSON.stringify(this.requireAllShopList)
      ); //对象深拷贝
      if (newVal == "first") {
        this.sortFunc(_requireAllShopList, "multiple");
      } else if (newVal == "second") {
        this.sortFunc(_requireAllShopList, "sales");
      } else if (newVal == "third") {
        this.sortFunc(_requireAllShopList, "comment");
      }
    },
    requireAllShopList(newVal) {
      let _requireAllShopList = JSON.parse(JSON.stringify(newVal)); //对象深拷贝
      //初始数据
      this.sortFunc(_requireAllShopList, "multiple");
    }
  },
  components: {
    shopList
  }
};
</script>

<style lang="less" scoped>
.recommend {
  .hotMall {
    font-size: 1rem;
    color: red;
    text-align: center;
    padding: 1rem 0;
  }
  /deep/ .el-tabs__nav-scroll {
    padding-left: 4rem;
  }

  //店铺板块
  //排序类型板块吸顶效果
  /deep/ .el-tabs__header {
    padding: 0;
    position: sticky;
    margin: 0 0 15px;
    top: 15vh;
    z-index: 999;
    background-color: rgba(255, 255, 255, 1);
  }
}
</style>