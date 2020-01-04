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
    <div class="addressEdit" v-show="isShowEditPart">
      <addressEdit @cancelEdit="cancelEdit" @savelEdit="savelEdit"></addressEdit>
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
      //   addressList: [],
      isShowEditPart: false //是否显示地址输入框
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
    onAdd() {
      //   Toast("新增地址");
      this.isShowEditPart = true;
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    //保存修改
    savelEdit() {
      this.isShowEditPart = false;
      Toast("已保存");
    },
    //取消修改函数
    cancelEdit() {
      this.isShowEditPart = false;
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