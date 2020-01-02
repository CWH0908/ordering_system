//检查用户信息（登录）
import axios from "axios"


export function login(account,psw) {
  return axios.get("http://localhost:8081/login",{params:{account,psw}}).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
