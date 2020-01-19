// 此函数  定义  需要取得的数据的名称，通过传入 state 状态库，然后返回特定的数据。
export const home_nav_currentIndex = (state) => {
  return state.home_nav_currentIndex
};

export const home_search_value = (state) => {
  return state.home_search_value
};

export const home_nav_requireAllShopList = (state) => {
  return state.home_nav_requireAllShopList
};

export const all_shop_car = (state) => {
  return state.all_shop_car;
}

export const currentUser = (state) => {
  return state.currentUser;
}

export const currentOrderData = (state) => {
  return state.currentOrderData
}

export const allShopOrderData = (state) => {
  return state.allShopOrderData
}
