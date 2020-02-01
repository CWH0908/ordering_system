import axios from "axios"
import {RemoteUrl} from "../API/RemoteServer"

export function getHomeRecommend() {
  return axios.get(RemoteUrl+"home_recommend").then(res => {
    return Promise.resolve(res.data);
  });
}

//根据ID更新店铺评分
export function updateShopRateValue(shopID, rateValue) {
  return axios.get(RemoteUrl+"updateShopRateValue", {
    params: {
      shopID,
      rateValue
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
