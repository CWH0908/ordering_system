<template>
  <div class="confirmOrder">
    <div class="container">
      <header>
        <div class="goBackPart">
          <span @click="goBack">
            <i class="el-icon-arrow-left"></i>
          </span>
          <h4>确认订单</h4>
        </div>
      </header>

      <div class="operation">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="选择收货地址" name="1">
            <div>地址一</div>
            <div>地址二</div>
            <div>地址三</div>
          </el-collapse-item>
          <el-collapse-item :title="'支付方式'+payRadio" name="2">
            <el-radio v-model="payRadio" label="支付宝">支付宝</el-radio>
            <el-radio v-model="payRadio" label="微信支付">微信支付</el-radio>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["0"], //折叠面板
      payRadio: "支付宝" //单选框支付方式
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleChange(val) {
      // console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
.confirmOrder {
  z-index: 9999;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: white;
  .container {
    height: 100%;
    background: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      from(#4169e1),
      to(#b0c4de)
    );
    header {
      .goBackPart {
        // position: fixed;
        // top: 0;
        height: 2vh;
        width: 100%;
        height: 8vh;
        z-index: 9999;
        span {
          font-size: 2rem;
          width: 20%;
        }
        h4 {
          display: inline-block;
          text-align: center;
          width: 80%;
          font-weight: normal;
        }
      }
    }
    .operation {
      width: 90%;
      margin: 0 auto;
      //   margin-top: 6vh;
      /deep/ .el-collapse {
        text-indent: 1rem;
      }
      /deep/ .el-collapse-item__content {
          padding: 10px 0;
      }
    }
  }
}
</style>