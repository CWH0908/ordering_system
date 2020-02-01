import axios from "axios"
import {RemoteUrl} from "../API/RemoteServer"

//用户登录
export function updateShopSaleTimes(shopID, shopInfo) {
  return axios.post(RemoteUrl+"updateShopSaleTimes", {
    params: {
      shopID,
      shopInfo
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
