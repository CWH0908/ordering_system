<template>
  <div class="person">
    <div class="container">
      <div class="headerPart">
        <div class="header">个人中心</div>
      </div>
      <div class="userInfoPart">
        <img v-lazy="pic_url" alt />
        <div>
          <i class="el-icon-mobile-phone"></i>
          {{userAccount|formatAccount}}
          <br />
          <p>再忙，也别忘记吃饭~</p>
          <br />
          <van-button class="exitButton" @click="exitButton" type="danger" size="small">退出登录</van-button>
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
import { mapGetters } from "vuex";
import { Dialog } from "vant";
export default {
  created() {
    this.userAccount = this.currentUser.userAccount;
    this.pic_url =
      "http://49.235.92.173:70/graduationDesign_images/defaultHeadImg.jpg";
  },
  data() {
    return {
      userAccount: "", //用户账号
      pic_url: "", //用户头像
      activeNames: ["1"] //地址折叠面板
    };
  },
  methods: {
    //个人中心图片尚未使用七牛云
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    //退出登录，跳转到登录页
    exitButton() {
      Dialog.confirm({
        title: "提示",
        message: "是否确认退出登录？"
      })
        .then(() => {
          this.$router.push("/sign");
        })
        .catch(() => {});
    }
  },
  computed: {
    ...mapGetters(["currentUser"])
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
    // height: 80vh;
    // padding-bottom: 20vh;
    height: 89vh;
    padding-top: 4rem;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#0096fb),
      to(#b0c4de)
    );

    .headerPart {
      position: fixed;
      top: 0;
      width: 100%;
      height: 9vh;
      background: #0096fb;
      z-index: 999;
      .header {
        width: 90%;
        margin: 0 auto;
        position: fixed;
        z-index: 999;
        top: 0.5rem;
        left: 0;
        right: 0;
        background-color: white;
        height: 6vh;
        line-height: 6vh;
        text-align: center;
        font-size: 1.2rem;
        border-radius: 24px;
      }
    }
    .userInfoPart {
      // height: 12vh;
      position: relative;
      background: white;
      margin: 0 auto;
      width: 88%;
      padding: 10px 1rem;
      margin-top: 1rem;
      border-radius: 10px;
      img {
        width: 5rem;
        vertical-align: text-bottom;
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
      .exitButton {
        // position: absolute;
        // bottom: 0.5rem;
        // padding: 0px 10px;
        // font-size: 0.1rem;
        margin-top: 0.5rem;
      }
    }
    .addressPart {
      width: 96%;
      margin: 0 auto;
      margin-top: 1rem;

      // /deep/ .van-collapse-item__title {
      //   border-top-left-radius: 10px;
      //   border-top-right-radius: 10px;
      // }

      // /deep/ .van-collapse-item__wrapper {
      //   border-bottom-left-radius: 10px;
      //   border-bottom-right-radius: 10px;
      // }
    }
  }
}
</style>