<template>
  <div class="home">
    <!-- 头部搜索栏 -->
    <cheader></cheader>

    <!-- 搜索框为空，显示该板块 -->
    <div v-if="home_search_value.trim()==''">
      <!-- 美食类别导航 -->
      <navPart></navPart>
      <!-- 推荐列表 -->
      <recommend></recommend>
    </div>

    <div v-else>
      <div v-if="shopList.length==0">在地球上找不到该美食！</div>
      <shopList v-else :shopList="shopList"></shopList>
    </div>
  </div>
</template>

<script>
import cheader from "../home/cheader";
import navPart from "../home/navPart";
import recommend from "../home/recommend";
import shopList from "../home/shopList";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      shopList: [] //存放搜索后得到的店铺数据
    };
  },
  components: {
    cheader,
    navPart,
    recommend,
    shopList
  },
  computed: {
    ...mapGetters(["home_search_value", "home_nav_requireAllShopList"])
  },
  watch: {
    //监听搜索框值的变动，对当前的sortList进行响应式数据过滤
    home_search_value(newVal) {
      //搜索词不为空才进行搜索，刷新sortList
      if (newVal.trim() != "") {
        let newList = [];
        let _requireAllShopList = JSON.parse(
          JSON.stringify(this.home_nav_requireAllShopList)
        );
        for (let item in _requireAllShopList) {
          //包含搜索词的店铺
          if (_requireAllShopList[item].shopName.includes(newVal)) {
            newList.push(_requireAllShopList[item]);
          }
        }
        this.shopList = JSON.parse(JSON.stringify(newList));
      } else {
        this.shopList = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  // background: -webkit-gradient(linear, 0 0, 0 100%, from(#4169e1), to(#b0c4de));
}
</style>