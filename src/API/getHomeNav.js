import axios from "axios"
import {RemoteUrl} from "../API/RemoteServer"

export function getHomeNav() {
  return axios.get(RemoteUrl+"home_nav").then(res => {
    return Promise.resolve(res.data);
  });
}
