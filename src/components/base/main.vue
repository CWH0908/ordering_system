<template>
  <div class="main">
    <transition name="slide-left">
      <router-view name="home"></router-view>
      <router-view name="today"></router-view>
      <router-view name="order"></router-view>
      <router-view name="person"></router-view>
      <!-- tab分类 -->
    </transition>
    <tab></tab>
  </div>
</template>

<script>
import tab from "../../components/tab/tab";
import { mapMutations, mapGetters } from "vuex";
import { clientWebScoket } from "../../API/webSocketUrl";
import { getOrder } from "../../API/getOrder";

export default {
  data() {
    return {
      websock: null, //用于初始化为一个webSocket实例
      requireData: "接收到服务端发送的数据:" //用于接收服务器返回的数据
    };
  },
  created() {
    this.connectWebScket(); //创建webSocket连接
  },
  destroyed() {
    this.closeConnect(); //关闭webSocket连接
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapMutations({
      set_currentOrderData: "set_currentOrderData"
    }),
    async _getOrder(userAccount) {
      let orderData = await getOrder(userAccount);
      this.set_currentOrderData(orderData);
    },

    //创建webSocket连接用于接收订单处理的最新的信息*******************************
    //连接到webSocket
    connectWebScket() {
      this.initWebSocket();
    },
    //关闭连接
    closeConnect() {
      this.websock.close();
    },
    initWebSocket() {
      //初始化weosocket
      // 以    ws://服务器地址/webSocket  路由的形式建立连接
      this.websock = new WebSocket(
        clientWebScoket + this.currentUser.userAccount
      );
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    //连接建立之后执行send方法发送数据
    websocketonopen() {
      // let actions = {
      //   shopID: "00000"
      // };
      // this.websocketsend(JSON.stringify(actions));
    },
    //连接建立失败重连
    websocketonerror() {
      this.initWebSocket();
    },
    //接收服务端数据
    websocketonmessage(e) {
      const redata = e.data;
      this.requireData = this.requireData + "\n" + redata;
      console.log("接收到服务端发送的数据：", redata);
      if (redata == "取消订单有新的处理结果") {
        this.$message({
          message: "取消订单申请有新的进度",
          type: "info"
        });
        this._getOrder(this.currentUser.userAccount); //重新请求订单信息，并更新vuex的currentOrderData
      }
    },
    //客户端发送数据
    websocketsend(Data) {
      this.websock.send(Data);
    },
    //关闭webSocket连接
    websocketclose(e) {
      console.log("关闭webSocket连接：", e);
    }
  },
  components: {
    tab
  }
};
</script>

<style lang="less" scoped>
.slide-left-enter {
  opacity: 0;
  // transform: translateX(100%);
}

.slide-left-enter-active {
  transition: all 400ms;
}

.slide-left-leave-to {
  opacity: 0;
  // transition: translateX(-100%);
}
</style>