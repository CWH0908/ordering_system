<template>
  <div class="cheader">
    <div class="container">
      <div class="welcome">校园食堂订餐平台</div>
      <el-autocomplete
        class="inline-input"
        clearable
        v-model="searchValue"
        :fetch-suggestions="querySearch"
        placeholder="搜索美食~"
        @select="handleSelect"
      ></el-autocomplete>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex';
export default {
  data() {
    return {
      searchValue: "",
      restaurants: [],
      lastTime:0,//用于节流函数计时器
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "北方面点", address: "长宁区新渔路144号" },
        {
          value: "华莱士",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "隆江猪脚饭",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "麦当劳", address: "天山西路438号" },
        {
          value: "木屋烧烤",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "胶己人没事",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" }
      ];
    },
    handleSelect(item) {
      //点击搜索提示的回调函数
      // console.log(item);
    },
    //节流函数
    throttle(newVal, wait) {
      var func = () => {
        var currentTime = Date.now();
        if (currentTime - this.lastTime > wait) {
          //如果调用时间间隔大于定时器规定时间，执行函数
          this.SearchShopInfo(newVal, this.searchValue); //搜索店铺信息
          this.lastTime = currentTime; //重置上一次函数被调用时的时间
        }
      };
      return func;
    },
    //搜索店铺信息
    SearchShopInfo(newVal){
      //存入vuex中
      this.set_home_search_value(newVal);
    },
    ...mapMutations({
      set_home_search_value:"set_home_search_value",
      set_home_nav_currentIndex:"set_home_nav_currentIndex"
    })
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
  watch: {
    searchValue(newVal) {
      this.throttle(newVal,500)()
    }
  }
};
</script>

<style lang="less" scoped>
.cheader {
  position: sticky;
  top: 0;
  z-index: 999;

  .container {
    // height: 10vh;
    padding: 1rem 0;
    background-color: rgba(81, 81, 245, 1);
    text-align: center;
    .welcome {
      font-size: 1.5rem;
      padding-bottom: 0.5rem;
      color: white;
    }
    /deep/ .inline-input {
      width: 90%;
    }
  }
}
</style>