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
    // this.$set(state.all_shop_car, key, all_shop_car)
  },

  //设置当前用户信息
  set_currentUser(state, currentUser) {
    state.currentUser = currentUser;
  },

  //设置当前用户的订单信息
  // set_currentOrderData(state, newOrderItem) {
  //   let tempDataArr = JSON.parse(JSON.stringify(state.currentOrderData)); //先获取旧的订单数组
  //   tempDataArr.push(newOrderItem)
  //   state.currentOrderData = tempDataArr
  // }
  set_currentOrderData(state, newOrderArr) {
    state.currentOrderData = newOrderArr
  }
}

export default mutations;
