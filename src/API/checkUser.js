//检查用户信息（登录）
import axios from "axios"
import {RemoteUrl} from "../API/RemoteServer"

//用户登录
export function login(account, psw) {
  // return axios.post("http://localhost:8081/login", {
  return axios.post(RemoteUrl+"login", {
    params: {
      account,
      psw
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

//用户注册查询
export function register(account) {
  return axios.post(RemoteUrl+"register", {
    params: {
      account
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

//写入用户注册数据
export function inputRegister(account, psw) {
  return axios.post(RemoteUrl+"inputRegister", {
    params: {
      account,
      psw
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

//更新用户地址数据库
export function updateAddress(account, addressData) {
  return axios.post(RemoteUrl+"updateAddress", {
    params: {
      account,
      addressData
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

//更新用户订单数据库
export function updateOrder(account, orderData) {
  return axios.post(RemoteUrl+"updateOrder", {
    params: {
      account,
      orderData
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
