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

