import axios from "axios"

//查询当前用户的订单信息
export function getOrder(account) {
  return axios.post("http://localhost:8081/getOrder", {
    params: {
      account
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//保存订单信息到数据库
export function saveOrder(orderData) {
  return axios.post("http://localhost:8081/saveOrder", {
    params: {
      orderData
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//更新订单状态信息到数据库
export function updateOrderState(orderItem, state) {
  return axios.post("http://localhost:8081/updateOrderState", {
    params: {
      orderItem,
      state
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//更新订单评论到数据库
export function updateOrderComment(orderItem, rateValue, comment) {
  return axios.post("http://localhost:8081/updateOrderComment", {
    params: {
      orderItem,
      rateValue,
      comment
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//查询当前店铺的订单信息
export function getShopOrder(ShopID) {
  return axios.post("http://localhost:8081/getShopOrder", {
    params: {
      ShopID
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//返回所有订单信息
export function getAllShopOrder() {
  return axios.post("http://localhost:8081/getAllShopOrder", {
    params: {}
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
