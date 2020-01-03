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
      <addressEdit></addressEdit>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import addressEdit from "../base/addressEdit";
export default {
  created() {
    this.addressList = JSON.parse(
      localStorage.getItem("currentUser")
    ).addressData;
  },
  data() {
    return {
      chosenAddressId: "1", //选择的地址
      addressList: [], //地址列表的数据
      isShowEditPart: false //是否显示地址输入框
    };
  },

  methods: {
    onAdd() {
      //   Toast("新增地址");
      this.isShowEditPart = true;
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
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