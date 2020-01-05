<template>
  <div class="person">
    <div class="container">
      <div class="header">个人中心</div>
      <div class="userInfoPart">
        <img :src="pic_url" alt />
        <div>
          <i class="el-icon-mobile-phone"></i>
          {{userAccount|formatAccount}}
          <br />
          <p>再忙，也别忘记吃饭~</p>
        </div>
      </div>

      <div class="addressPart">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="收货地址" name="1">
            <addressList></addressList>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import addressList from "../base/addressList";
export default {
  created() {
    this.userAccount = JSON.parse(
      localStorage.getItem("currentUser")
    ).userAccount;
    this.pic_url = JSON.parse(localStorage.getItem("currentUser")).pic_url;
  },
  data() {
    return {
      userAccount: "", //用户账号
      pic_url: "", //用户头像
      activeNames: ["1"] //地址折叠面板
    };
  },
  filters: {
    //隐藏手机信息，待完善
    formatAccount(value) {
      if (value.length > 5) {
        // let middleIndex = parseInt(value.length / 2);
        return value;
      } else {
        //5位数的账号隐藏中间两位
        value = value.replace(parseInt(value.length / 2), "*");
        value = value.replace(parseInt(value.length / 2) + 1, "*");
        return value;
      }
    }
  },
  components: {
    addressList
  }
};
</script>

<style lang="less" scoped>
.person {
  .container {
    height: 100vh;
    padding-top: 1rem;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#4169e1),
      to(#b0c4de)
    );
    .header {
      background-color: white;
      width: 90%;
      margin: 0 auto;
      height: 6vh;
      line-height: 6vh;
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      border-radius: 24px;
    }
    .userInfoPart {
      background: white;
      margin: 0 auto;
      width: 88%;
      padding: 10px 1rem;
      img {
        width: 20vw;
        vertical-align: middle;
      }
      div {
        display: inline-block;
        margin-left: 2rem;
        font-size: 1.2rem;
        font-weight: 900;
        p {
          float: left;
          padding-top: 0.5rem;
          font-size: 0.8rem;
          color: gray;
        }
      }
    }
    .addressPart {
      width: 96%;
      margin: 0 auto;
      margin-top: 2rem;
    }
  }
}
</style>