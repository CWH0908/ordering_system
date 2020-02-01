import axios from "axios"
import {RemoteUrl} from "../API/RemoteServer"

//查询当前用户的订单信息
export function getOrder(account) {
  return axios.post(RemoteUrl+"getOrder", {
    params: {
      account
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//保存订单信息到数据库
export function saveOrder(orderData) {
  return axios.post(RemoteUrl+"saveOrder", {
    params: {
      orderData
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//更新订单状态信息到数据库
export function updateOrderState(orderItem, state) {
  return axios.post(RemoteUrl+"updateOrderState", {
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
  return axios.post(RemoteUrl+"updateOrderComment", {
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
  return axios.post(RemoteUrl+"getShopOrder", {
    params: {
      ShopID
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}

//返回所有订单信息
export function getAllShopOrder() {
  return axios.post(RemoteUrl+"getAllShopOrder", {
    params: {}
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
