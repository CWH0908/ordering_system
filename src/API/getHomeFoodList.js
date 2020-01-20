import axios from "axios"


export function getHomeShoplist(shopID) {
  return axios.get("http://localhost:8081/home_shopList", {
    params: shopID
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

export function getHomeFoodList(shopID) {
  return axios.get("http://localhost:8081/home_foodList", {
    params: shopID
  }).then(res => {
    return Promise.resolve(res.data);
  });
}


export function updateFoodSaleTimes(foodID, foodCount) {
  return axios.post("http://localhost:8081/updateFoodSaleTimes", {
    params: {
      foodID,
      foodCount
    }
  }).then(res => {
    return Promise.resolve(res.data);
  });
}
