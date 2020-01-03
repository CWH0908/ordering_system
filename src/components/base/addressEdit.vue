<template>
  <div class="addressEdit">
    <div class="container">
      <div class="receiverName">
        <!-- <van-cell-group> -->
        <van-field
          v-model="receiverName"
          clearable
          type="number"
          label="姓名"
          placeholder="请输入收货人姓名"
          required
        />
        <!-- </van-cell-group> -->
      </div>
      <div class="receiverPhone">
        <!-- <van-cell-group> -->
        <van-field
          v-model="receiverPhone"
          clearable
          type="number"
          label="手机"
          placeholder="请输入收货人手机号"
          required
        />
        <!-- </van-cell-group> -->
      </div>
      <div class="receiverAddress">
        <!-- <van-cell-group> -->
        <van-field
          v-model="receiverAddress"
          clearable
          type="number"
          label="地址"
          placeholder="请输入收货地址"
          required
        />
        <!-- </van-cell-group> -->
      </div>
      <van-button @click="saveButton" class="saveButton" type="danger">保存</van-button>
      <van-button @click="cancelButton" class="cancelButton" type="danger" plain>取消</van-button>
      <van-button @click="deleteButton" class="deleteButton" type="danger" plain>删除</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Field } from "vant";
export default {
  data() {
    return {
      receiverName: "",
      receiverPhone: "",
      receiverAddress: ""
    };
  },
  methods: {
    saveButton() {
      if (
        this.receiverName.trim() != "" &&
        this.receiverPhone.trim() != "" &&
        this.receiverAddress.trim() != ""
      ) {
        //把新的收货信息存储到 localStorage和数据库中
        let newObj = {};
        newObj.receiverName = this.receiverName;
        newObj.receiverPhone = this.receiverPhone;
        newObj.receiverAddress = this.receiverAddress;

        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUser.addressData.push(newObj);
        localStorage.setItem("currentUser",JSON.stringify(currentUser));

        //存入数据库

        this.$emit("savelEdit"); //抛出取消修改函数
      } else {
        Toast("请完善信息");
      }
    },
    cancelButton() {
      this.$emit("cancelEdit"); //抛出取消修改函数
    },
    deleteButton() {}
  }
};
</script>

<style lang="less" scoped>
.addressEdit {
  //   /deep/ .van-address-edit {
  //     position: absolute;
  //     width: 90%;
  //     top: 50%;
  //     left: 50%;
  //     transform: translate(-50%, -50%);
  //   }
  .container {
    position: absolute;
    width: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    line-height: 4;
    font-size: 1rem;
    padding: 1rem 1rem;
    box-sizing: border-box;
    .receiverName {
      border-bottom: 1px solid gray;
    }
    .receiverPhone {
      border-bottom: 1px solid gray;
    }
    .receiverAddress {
      border-bottom: 1px solid gray;
    }
    .saveButton {
      width: 100%;
      border-radius: 28px;
    }
    .cancelButton {
      width: 100%;
      border-radius: 28px;
    }
    .deleteButton {
      width: 100%;
      border-radius: 28px;
    }
  }
}
</style>