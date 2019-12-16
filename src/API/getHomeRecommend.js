import axios from "axios"
export function getHomeRecommend() {
  return axios.get("http://localhost:8081/home_recommend").then(res => {
    return Promise.resolve(res.data);
  });
}
