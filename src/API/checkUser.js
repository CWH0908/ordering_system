//检查用户信息（登录）
import axios from "axios"

//用户登录
export function login(account, psw) {
  return axios.get("http://localhost:8081/login", {
    params: {
      account,
      psw
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

//用户注册查询
export function register(account) {
  return axios.get("http://localhost:8081/register", {
    params: {
      account
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}

//写入用户注册数据
export function inputRegister(account,psw) {
  return axios.get("http://localhost:8081/inputRegister", {
    params: {
      account,
      psw
    }
  }).then(res => {
    return Promise.resolve(res.data[0]);
  });
}
