<template>
  <div class="backgroundDIV">
    <div class="shopCarInfo">
      <shopCarItem :shopCarFoodList="shopCarFoodList"></shopCarItem>
    </div>
  </div>
</template>

<script>
import shopCarItem from "../base/shopCarItem";
import { mapGetters } from "vuex";
import { getHomeFoodList } from "../../API/getHomeFoodList";
export default {
  props: {
    shopID: {
      type: String,
      default: -1
    }
  },
  created() {
    //根据shopID,先请求该店铺下的所以菜品数据，以便组成购物车菜品信息
    this._getFoodList();
  },
  data() {
    return {
      allFoodList: [] //所有菜品信息列表（包含推荐和其他）
      //   shopCarFoodList: [],//组成购物车的菜品信息
    };
  },
  methods: {
    //请求该店铺的菜品信息
    async _getFoodList() {
      this.allFoodList = await getHomeFoodList(this.shopID);
    }
  },
  computed: {
    ...mapGetters(["all_shop_car"]),
    shopCarFoodList() {
      let newArr = [];
      for (let x in this.all_shop_car) {
        if (this.all_shop_car[x].shopID == this.shopID) {
          for (let y in this.all_shop_car[x].shopCar) {
            let newObj = {};
            newObj.shopID = this.shopID;
            newObj.foodID = this.all_shop_car[x].shopCar[y].foodID;
            //从 allFoodList 中查找
            for (let z in this.allFoodList) {
              if (
                this.allFoodList[z].foodID ==
                this.all_shop_car[x].shopCar[y].foodID
              ) {
                newObj.newMoney = this.allFoodList[z].newMoney; //单价
                newObj.foodName = this.allFoodList[z].foodName; //菜品名称
              }
            }
            newObj.foodCount = this.all_shop_car[x].shopCar[y].foodCount; //数量

            newArr.push(newObj);
          }
        }
      }
      return newArr;
    }
  },
  components: {
    shopCarItem
  }
};
</script>

<style lang="less" scoped>
.backgroundDIV {
  z-index: 9999;
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
}
.shopCarInfo {
  position: fixed;
  bottom: 6.5vh;
  width: 100%;
  min-height: 5rem;
  max-height: 60vh;
  background-color: white;
}
</style>