import axios from "axios"

//用户登录
export function addShopSaleTimes(shopID, shopInfo) {
  return axios.post("http://localhost:8081/addShopSaleTimes", {
    params: {
      shopID,
      shopInfo
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
