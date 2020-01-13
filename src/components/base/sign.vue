<template>
  <div class="sign">
    <div class="firstBg">
      <img src="../../resources/image/firstBg.jpg" />
    </div>
    <div class="headImgDiv">
      <img class="headImg" src="../../resources/image/defaultHeadImg.jpg" />
    </div>
    <transition appear mode="out-in">
      <div class="signBox">
        <el-input
          prefix-icon="el-icon-user"
          class="input"
          placeholder="请输入账号"
          v-model="inputAccount"
          clearable
        ></el-input>
        <el-input
          class="input"
          prefix-icon="el-icon-edit-outline"
          placeholder="请输入密码"
          v-model="inputPwd"
          clearable
        ></el-input>
        <div class="opration">
          <!-- <span class="forgetButon">忘记密码</span> -->
          <el-button
            class="sign-up-button"
            type="primary"
            @click="userRegister"
          >注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
          <el-button
            class="sign-in-button"
            type="primary"
            @click="userLogin"
          >登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { login, register, inputRegister } from "../../API/checkUser";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      inputAccount: "", //账号
      inputPwd: "", //密码
      userData: {} //用于存储从数据库查询回来的用户信息(包括账号、密码、地址信息数组、订单信息数组)
    };
  },
  methods: {
    //用户登录
    userLogin() {
      this._userLogin();
    },
    async _userLogin() {
      if (this.inputAccount != "" && this.inputPwd != "") {
        let temp = await login(this.inputAccount, this.inputPwd);
        if (temp) {
          this.userData = temp;
          // localStorage.setItem("currentUser", JSON.stringify(temp)); //在本地设置当前用户信息(序列化后存储)
          this.set_currentUser(temp); //将从数据库中返回的数据保存在vuex中

          const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: "正在登录 3 秒"
          });

          let second = 3;
          const timer = setInterval(() => {
            second--;
            if (second) {
              toast.message = `正在登录 ${second} 秒`;
            } else {
              clearInterval(timer);
              // 手动清除 Toast
              Toast.clear();
            }
          }, 1000);
          const routerTimer = setTimeout(() => {
            this.$router.push({ path: "/main/home" });
          }, 3000);
        } else {
          Toast("账号密码错误");
        }
      } else {
        Toast("请输入账号密码");
      }
    },

    //用户注册
    userRegister() {
      this._userRegister();
    },
    async _userRegister() {
      if (this.inputAccount != "" && this.inputPwd != "") {
        let temp = await register(this.inputAccount);
        console.log("查找回来的数据temp", temp);
        if (temp) {
          Toast("该账号已注册");
        } else {
          //写入注册的账号密码到数据库
          Toast("注册成功");
          await inputRegister(this.inputAccount, this.inputPwd);
        }
      } else {
        Toast("请完善账号密码");
      }
    },

    //将用户信息保存在vuex中，实现用户信息中的购物车数据实时更新
    ...mapMutations({
      set_currentUser: "set_currentUser"
    })
  }
};
</script>

<style lang="less" scoped>
.sign {
  width: 100%;
  .firstBg {
    img {
      width: 100%;
      height: 100vh;
      display: block;
      background-size: contain;
    }
  }
  //头像
  .headImgDiv {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -50%);
    .headImg {
      width: 30vw;
      height: 30vw;
      border-radius: 50%;
    }
  }
  //登录框
  .signBox {
    width: 90vw;
    height: 33vh;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    .input {
      width: 90%;
      display: block;
      margin: 0 auto;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    .sign-up-button {
      // width: 82vw;
      height: 6.5vh;
      display: inline-block;
      text-align: center;
      border-radius: 20px;
      margin-right: 6.8rem;
    }
    .sign-in-button {
      // width: 82vw;
      height: 6.5vh;
      display: inline-block;
      text-align: center;
      border-radius: 20px;
    }
    .opration {
      display: block;
      margin: 0 1rem;
      .forgetButon {
        padding-left: 1rem;
        padding-right: 1.5rem;
      }
    }
  }
}
</style>