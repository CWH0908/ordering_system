<template>
  <div class="websocket">
    <textarea cols="50" rows="20" v-model="requireData"></textarea>
    <el-button type="primary" @click="connectWebScket">连接到服务器webSocket</el-button>
    <el-button type="danger" @click="closeConnect">关闭连接</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: null, //用于初始化为一个webSocket实例
      requireData: "接收到服务端发送的数据:" //用于接收服务器返回的数据
    };
  },
  destroyed() {
    //销毁组件，跳转路由时关闭webSocket连接
    this.websock.close();
  },
  methods: {
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
      const wsuri = "ws://127.0.0.1:8081/test";
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    //连接建立之后执行send方法发送数据
    websocketonopen() {
      let actions = {
        sendCustomData: "建立连接后，客户端自动发送数据****到服务端"
      };
      this.websocketsend(actions);
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
    },
    //客户端发送数据
    websocketsend(Data) {
      this.websock.send(Data);
    },
    //关闭webSocket连接
    websocketclose(e) {
      console.log("关闭webSocket连接：", e);
    }
  }
};
</script>

<style scoped>
</style>