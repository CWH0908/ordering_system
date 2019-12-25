<template>
  <div class="recommend">
    <p class="hotMall">-推荐店铺-</p>

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
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "first", //初始选择板块
      requireAllShopList: [], //从API接口拿到的所有店铺数据
      sortList: [], //默认综合排序的数据
      differentTypeShopList: [], //根据所选，大众、饮料等不同类别，将所有数据进行一个按类型过滤
      useWhichData: "all" //
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
        // delete res[0]._id; //移除数据库自带的_id属性
        // let formatData = this.formatShopList(res[0]);
        // this.requireAllShopList = formatData;
        this.requireAllShopList = res;
        //保存在vuex供其他组件使用
        this.set_home_nav_requireAllShopList(res);

        //获取所有店铺后，初始化所有店铺的购物车数据到vuex
        //数据格式 all_shop_car : [  {"shopID":"", "shopCar":[{"shopID":"","foodID":"","foodCount":"","foodPrice":""}] }  ]
        let newArr = [];
        this.requireAllShopList.forEach(item => {
          let newObj = {};
          newObj.shopID = item.shopID;
          newObj.shopCar = [];
          newArr.push(newObj);
        });
        this.set_all_shop_car(newArr);
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
          if (
            currentItem.saleTimes * 0.06 + currentItem.rateValue * 60 >
            pivot
          ) {
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
    },

    //按照nav所选的店铺类型，进行排序，传入所有店铺数据进行过滤
    filterShopType(allShopList, shopType) {
      let newShopList = [];
      for (let item in allShopList) {
        if (allShopList[item].mallType == shopType) {
          newShopList.push(allShopList[item]);
        }
      }
      return newShopList;
    },

    ...mapMutations({
      set_home_nav_requireAllShopList: "set_home_nav_requireAllShopList",
      set_all_shop_car: "set_all_shop_car"
    })
  },
  computed: {
    ...mapGetters(["home_nav_currentIndex"])
  },
  watch: {
    // 切换排序方式
    activeName(newVal) {
      window.scrollTo(0, 0); //滚动条回到顶部
      let _requireAllShopList = JSON.parse(
        JSON.stringify(this.requireAllShopList)
      ); //对象深拷贝
      let _differentTypeShopList = JSON.parse(
        JSON.stringify(this.differentTypeShopList)
      ); //对象深拷贝
      //如果是没有选择home_nav 类型筛选的，显示所有店铺信息
      if (this.home_nav_currentIndex == -1) {
        if (newVal == "first") {
          this.sortFunc(_requireAllShopList, "multiple");
        } else if (newVal == "second") {
          this.sortFunc(_requireAllShopList, "sales");
        } else if (newVal == "third") {
          this.sortFunc(_requireAllShopList, "comment");
        }
      } else {
        //使用筛选后的数据进行显示，并控制排序方式
        if (newVal == "first") {
          this.sortFunc(_differentTypeShopList, "multiple");
        } else if (newVal == "second") {
          this.sortFunc(_differentTypeShopList, "sales");
        } else if (newVal == "third") {
          this.sortFunc(_differentTypeShopList, "comment");
        }
      }
    },
    requireAllShopList(newVal) {
      let _requireAllShopList = JSON.parse(JSON.stringify(newVal)); //对象深拷贝
      //初始数据
      this.sortFunc(_requireAllShopList, "multiple");
    },
    //home_nav 类别index
    home_nav_currentIndex(newVal) {
      //-1 表示没有选择类别，默认显示初始的所有数据
      let allShopList = JSON.parse(JSON.stringify(this.requireAllShopList));
      if (newVal == -1) {
        this.differentTypeShopList = allShopList;
      } else {
        switch (newVal) {
          case "0":
            this.differentTypeShopList = this.filterShopType(
              allShopList,
              "Popular"
            );
            break;
          case "1":
            this.differentTypeShopList = this.filterShopType(
              allShopList,
              "Noodles"
            );
            break;
          case "2":
            this.differentTypeShopList = this.filterShopType(
              allShopList,
              "Drinks"
            );
            break;
          case "3":
            this.differentTypeShopList = this.filterShopType(
              allShopList,
              "Barbecue"
            );
            break;
          case "4":
            this.differentTypeShopList = this.filterShopType(
              allShopList,
              "Hamburger"
            );
            break;
          case "5":
            this.differentTypeShopList = this.filterShopType(
              allShopList,
              "Fruit"
            );
            break;
          default:
            break;
        }

        // 大众菜式：Popular    0
        // 粥粉面饭：Noodles    1
        // 奶茶饮料：Drinks     2
        // 爆香烧烤：Barbecue   3
        // 汉堡披萨：Hamburger  4
        // 水果甜品：Fruit      5
      }
      //更新店铺信息后，重新渲染视图
      // this.sortList = JSON.parse(JSON.stringify(this.differentTypeShopList));
      let _differentTypeShopList = JSON.parse(
        JSON.stringify(this.differentTypeShopList)
      );
      if (this.activeName == "first") {
        this.sortFunc(_differentTypeShopList, "multiple");
      } else if (this.activeName == "second") {
        this.sortFunc(_differentTypeShopList, "sales");
      } else if (this.activeName == "third") {
        this.sortFunc(_differentTypeShopList, "comment");
      }
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