<template>
  <div class="addressList">
    <div class="noAddressData" v-if="addressList.length==0">暂无收货地址，点击新增地址</div>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @click-item="onClickItem"
    />
    <div class="addressEdit" v-if="isShowInsertPart">
      <addressEdit @cancelEdit="cancelEdit" @savelEdit="savelEdit"></addressEdit>
    </div>
    <div class="addressEdit" v-if="isShowModifyPart">
      <addressEdit
        @cancelEdit="cancelEdit"
        @modifyEdit="modifyEdit"
        @deleteEdit="deleteEdit"
        :editType="'modify'"
        :name="name"
        :tel="tel"
        :address="address"
        :index="index"
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
    // this.addressList = JSON.parse(
    //   localStorage.getItem("currentUser")
    // ).addressData;
  },
  mounted() {
    // document
    //   .getElementsByClassName("van-radio__icon")[0]
    //   .classList.add("van-radio__icon--checked");
  },
  data() {
    return {
      chosenAddressId: "1", //选择的地址
      isShowInsertPart: false, //是否显示地址新增框
      isShowModifyPart: false, //是否显示地址修改框
      name: "", //用于暂存具体地址，以供传入修改框组件
      tel: "",
      address: "",
      index: -1 //索引下标
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
  },
  methods: {
    //选择地址
    onClickItem(item, index) {
        // console.log(item,index);
        this.$emit("onClickItem",item,index);
    },
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
      this.index = index;
      this.isShowModifyPart = true;
    },
    //新增
    savelEdit() {
      this.isShowInsertPart = false;
      Toast("已保存");
    },
    //修改
    modifyEdit() {
      this.isShowModifyPart = false;
      Toast("已修改");
    },
    //删除
    deleteEdit() {
      this.isShowModifyPart = false;
      Toast("已删除");
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
    z-index: 999;
  }
}
</style>