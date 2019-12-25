//mutation 代表改变，只可以通过这里面定义的函数来提交数据
const mutations = {
  //所有函数传入的第一个参数为 state (状态)
  set_home_nav_currentIndex(state, home_nav_currentIndex) {
    state.home_nav_currentIndex = home_nav_currentIndex;
  },
  set_home_search_value(state, home_search_value) {
    state.home_search_value = home_search_value;
    //每次搜索店铺，将home_nav_currentIndex置为-1
    state.home_nav_currentIndex = -1;
  },
  set_home_nav_requireAllShopList(state, home_nav_requireAllShopList) {
    state.home_nav_requireAllShopList = home_nav_requireAllShopList;
  },
  //设置购物车数据
  set_all_shop_car(state, all_shop_car) {
    state.all_shop_car = all_shop_car;
  }
}

export default mutations;
