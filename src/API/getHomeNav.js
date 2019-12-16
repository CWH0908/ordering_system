import axios from "axios"
export function getHomeNav() {
  return axios.get("http://localhost:8081/home_nav").then(res => {
    return Promise.resolve(res.data);
  });
}
