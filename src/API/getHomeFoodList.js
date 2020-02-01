import axios from "axios"
import {RemoteUrl} from "../API/RemoteServer"

export function getHomeShoplist(shopID) {
  return axios.get(RemoteUrl+"home_shopList", {
    params: shopID
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

export function getHomeFoodList(shopID) {
  return axios.get(RemoteUrl+"home_foodList", {
    params: shopID
  }).then(res => {
    return Promise.resolve(res.data);
  });
}


export function updateFoodSaleTimes(foodID, foodCount) {
  return axios.post(RemoteUrl+"updateFoodSaleTimes", {
    params: {
      foodID,
      foodCount
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
