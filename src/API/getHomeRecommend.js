import axios from "axios"
export function getHomeRecommend() {
  return axios.get("http://localhost:8081/home_recommend").then(res => {
    return Promise.resolve(res.data);
  });
}

//根据ID更新店铺评分
export function updateShopRateValue(shopID, rateValue) {
  return axios.get("http://localhost:8081/updateShopRateValue", {
    params: {
      shopID,
      rateValue
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
