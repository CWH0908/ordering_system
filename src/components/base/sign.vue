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
          <span class="forgetButon">忘记密码</span>
          <el-button class="sign-up-button" type="success" plain>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</el-button>
          <el-button class="sign-in-button" type="primary">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputAccount: "", //账号
      inputPwd: "" //密码
    };
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