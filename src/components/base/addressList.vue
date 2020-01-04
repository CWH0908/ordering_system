<template>
  <div class="addressList">
    <div class="noAddressData" v-if="addressList.length==0">暂无收货地址，点击新增地址</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <div class="addressEdit" v-if="isShowInsertPart">
      <addressEdit @cancelEdit="cancelEdit" @savelEdit="savelEdit"></addressEdit>
    </div>
    <div class="addressEdit" v-if="isShowModifyPart">
      <addressEdit
        @cancelEdit="cancelEdit"
        @modifyEdit="modifyEdit"
        :editType="'modify'"
        :name="name"
        :tel="tel"
        :address="address"
      ></addressEdit>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import addressEdit from "../base/addressEdit";
import { mapGetters } from "vuex";
export default {
  created() {
    this.addressList = JSON.parse(
      localStorage.getItem("currentUser")
    ).addressData;
  },
  data() {
    return {
      chosenAddressId: "1", //选择的地址
      isShowInsertPart: false, //是否显示地址新增框
      isShowModifyPart: false, //是否显示地址修改框
      name: "", //用于暂存具体地址，以供传入修改框组件
      tel: "",
      address: ""
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    //地址列表的数据
    addressList: {
      get() {
        return this.currentUser.addressData;
      },
      set() {}
    }
    // currentUser() {
    //   console.log("用户信息@@@@@@@@", this.currentUser);
    //   return JSON.parse(localStorage.getItem("currentUser"));
    // },
    // addressData() {
    //   console.log("地址信息@@@@@@@@", this.currentUser.addressData);
    //   return this.currentUser.addressData;
    // }
    // addressList() {
    //   debugger;
    //   if (this.addressData.length == 0) {
    //     return [];
    //   } else {
    //     let newArr = [];
    //     this.addressData.forEach(addressItem => {
    //     //   debugger;
    //       let newObj = {};
    //       newObj.name = this.addressData.receiverName;
    //       newObj.tel = this.addressData.receiverPhone;
    //       newObj.address = this.addressData.receiverAddress;
    //       newArr.push(newObj);
    //     });
    //     let addressData = JSON.parse(localStorage.getItem("currentUser")).addressData;
    //     addressData.push();
    //     localStorage.setItem("currentUser", addressData);
    //     return newArr;
    //   }
    // }
  },
  methods: {
    //新增地址
    onAdd() {
      this.isShowInsertPart = true;
    },
    //编辑地址
    onEdit(item, index) {
      //修改数据后通过props传给地址修改组件
      this.name = this.currentUser.addressData[index].name;
      this.tel = this.currentUser.addressData[index].tel;
      this.address = this.currentUser.addressData[index].address;
      this.isShowModifyPart = true;
    },
    //保存修改
    savelEdit() {
      this.isShowInsertPart = false;
      Toast("已保存");
    },
    //修改地址函数
    modifyEdit() {
      this.isShowModifyPart = false;
      Toast("已修改");
    },
    //取消新增、修改函数
    cancelEdit() {
      this.isShowInsertPart = false;
      this.isShowModifyPart = false;
    }
  },
  components: {
    addressEdit
  }
};
</script>

<style lang="less" scoped>
.addressList {
  .noAddressData {
    text-align: center;
    color: gray;
  }
  /deep/ .van-address-list {
    padding-bottom: 10px;
    /deep/ .van-address-list__bottom {
      position: static;
    }
  }
  .addressEdit {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>