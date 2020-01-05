<template>
  <div class="addressEdit">
    <div class="container">
      <div class="name">
        <!-- <van-cell-group> -->
        <van-field
          v-model="currentName"
          clearable
          type="tel"
          label="姓名"
          placeholder="请输入收货人姓名"
          required
        />
        <!-- </van-cell-group> -->
      </div>
      <div class="tel">
        <!-- <van-cell-group> -->
        <van-field
          v-model="currentTel"
          clearable
          type="number"
          label="手机"
          placeholder="请输入收货人手机号"
          required
        />
        <!-- </van-cell-group> -->
      </div>
      <div class="address">
        <!-- <van-cell-group> -->
        <van-field
          v-model="currentAddress"
          clearable
          type="tel"
          label="地址"
          placeholder="请输入收货地址"
          required
        />
        <!-- </van-cell-group> -->
      </div>
      <van-button @click="saveButton" class="saveButton" type="danger" v-if="editType!='modify'">保存</van-button>
      <van-button
        v-if="editType=='modify'"
        @click="modifyButton"
        class="deleteButton"
        type="danger"
      >修改</van-button>
      <van-button
        v-if="editType=='modify'"
        @click="deleteButton"
        class="deleteButton"
        type="danger"
        plain
      >删除</van-button>
      <van-button @click="cancelButton" class="cancelButton" type="danger" plain>取消</van-button>
    </div>
  </div>
</template>

<script>
import { Toast, Field } from "vant";
import { updateAddress } from "../../API/checkUser";
import { mapMutations, mapGetters } from "vuex";
export default {
  props: {
    //用于区分是哪种输入框，新增还是修改
    editType: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    tel: {
      type: String,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      currentName: this.name,
      currentTel: this.tel,
      currentAddress: this.address
    };
  },
  computed: {
    ...mapGetters(["currentUser"])
  },
  methods: {
    ...mapMutations({
      set_currentUser: "set_currentUser"
    }),
    //取消按钮
    cancelButton() {
      this.$emit("cancelEdit"); //抛出取消修改函数
    },
    //修改
    modifyButton() {
      //在vuex中修改
      let currentUser = JSON.parse(JSON.stringify(this.currentUser));
      currentUser.addressData[this.index].name = this.currentName;
      currentUser.addressData[this.index].tel = this.currentTel;
      currentUser.addressData[this.index].address = this.currentAddress;
      this.set_currentUser(currentUser);

      //在数据库中修改

      this.$emit("modifyEdit"); //抛出修改
    },
    //新增
    saveButton() {
      if (
        this.currentName.trim() != "" &&
        this.currentTel.trim() != "" &&
        this.currentAddress.trim() != ""
      ) {
        //把新的收货信息存储到 vuex和数据库中
        let newObj = {};
        let timeNumber = new Date().getTime();
        newObj.id = timeNumber;
        newObj.name = this.currentName;
        newObj.tel = this.currentTel;
        newObj.address = this.currentAddress;
        //第一条数据设为默认
        if (this.currentUser.addressData.length == 0) {
          newObj.isDefault = true;
        }
        //从vuex读取当前用户购物车，完成新地址写入
        let currentUser = JSON.parse(JSON.stringify(this.currentUser));
        currentUser.addressData.push(newObj);

        //更新到vuex
        this.set_currentUser(currentUser);

        //存入数据库
        console.log(
          "存入数据库的数据",
          currentUser.userAccount,
          currentUser.addressData
        );
        updateAddress(currentUser.userAccount, currentUser.addressData);

        //输入框置空
        this.currentName = "";
        this.currentTel = "";
        this.currentAddress = "";

        this.$emit("savelEdit"); //抛出保存新增地址函数
      } else {
        Toast("请完善信息");
      }
    },
    //删除
    deleteButton() {
      // 在vuex中删除
      let currentUser = JSON.parse(JSON.stringify(this.currentUser));
      //   delete currentUser.addressData[this.index];
      currentUser.addressData.splice(this.index, 1);
      //长度不为0，设置第一个为默认
      if (currentUser.addressData.length != 0) {
        currentUser.addressData[0].isDefault = true;
      }
      this.set_currentUser(currentUser);
      //在数据库删除
      this.$emit("deleteEdit"); //抛出删除
    }
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
    .name {
      border-bottom: 1px solid gray;
    }
    .tel {
      border-bottom: 1px solid gray;
    }
    .address {
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