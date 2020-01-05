<template>
  <div class="backgroundDIV">
    <div class="shopCarInfo">
      <ul>
        <li class="text">已选商品</li>
        <div v-if="shopCarFoodList.length>0">
          <li v-for="(item,index) in shopCarFoodList" :key="index">
            <shopCarItem :shopCarFoodItem="item" @selectFoodItem="selectFoodItem"></shopCarItem>
          </li>
        </div>
        <div v-else class="nothing">空空如也~快去搜索美食吧~</div>
      </ul>
    </div>
  </div>
</template>

<script>
import shopCarItem from "../base/shopCarItem";
import { mapMutations, mapGetters } from "vuex";
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
    },
    //购物车详情修改菜品数量信息
    selectFoodItem(foodInfo, count) {
      //点击菜品修改数量后，根据 all_shop_car 里当前店铺的shopCar信息进行增删改操作
      this.all_shop_car.forEach(shopItem => {
        //修改当前店铺的购物车信息
        // debugger;
        if (shopItem.shopID == this.shopID) {
          //当前店铺的购物车数组为空，直接插入新增数据
          if (shopItem.shopCar.length == 0) {
            let newObj = {};
            newObj.shopID = this.shopID;
            newObj.foodData = foodInfo;
            newObj.foodCount = count; //菜品数量
            let newArr = [newObj];
            //$set插入数组才能触发更新
            shopItem.shopCar.push(newObj);
            // this.$set(shopItem.shopCar,0,newArr)
            this.set_all_shop_car(this.all_shop_car); //保存到vuex
          } else {
            //当前修改的菜品信息在购物车数组中不存在，直接插入，如果已存在，修改该菜品下的数量即可
            let isExit = false; //菜品已存在？，默认不存在
            shopItem.shopCar.forEach(foodItem => {
              //   debugger;
              if (foodItem.foodData.foodID == foodInfo.foodData.foodID) {
                isExit = true;
              }
            });
            //菜品不存在
            if (!isExit) {
              //   debugger;
              let newObj = {};
              newObj.shopID = this.shopID;
              newObj.foodData = foodInfo;
              newObj.foodCount = count; //菜品数量
              shopItem.shopCar.push(newObj);
              this.set_all_shop_car(this.all_shop_car); //保存到vuex
            } else {
              //菜品已存在，修改数量
              shopItem.shopCar.forEach(foodItem => {
                // debugger;
                if (foodItem.foodData.foodID == foodInfo.foodData.foodID) {
                  //数量为0，删除购物车中该菜品
                  if (count == 0) {
                    //遍历购物车所有信息，删除指定foodID的数据
                    for (let i in shopItem.shopCar) {
                      if (
                        shopItem.shopCar[i].foodData.foodID ==
                        foodItem.foodData.foodID
                      ) {
                        shopItem.shopCar.splice(i, 1);
                      }
                    }
                    this.set_all_shop_car(this.all_shop_car); //保存到vuex
                  } else {
                    foodItem.foodCount = count;
                    this.set_all_shop_car(this.all_shop_car); //保存到vuex
                  }
                }
              });
            }
          }
        }
      });
    },
    //购物车显隐
    toggleShopCar() {
      this.$emit("toggleShopCar");
    },
    ...mapMutations({
      set_all_shop_car: "set_all_shop_car"
    })
  },
  computed: {
    ...mapGetters(["all_shop_car"]),
    //整理购物车数据格式
    shopCarFoodList() {
      //为了完整的foodInfo信息，直接从数据库取得
      //   let newArr = [];
      //   for (let x in this.all_shop_car) {
      //     if (this.all_shop_car[x].shopID == this.shopID) {
      //       for (let y in this.all_shop_car[x].shopCar) {
      //         let newObj = {};
      //         newObj.shopID = this.shopID;
      //         newObj.foodID = this.all_shop_car[x].shopCar[y].foodID;
      //         //从 allFoodList 中查找
      //         for (let z in this.allFoodList) {
      //           if (
      //             this.allFoodList[z].foodID ==
      //             this.all_shop_car[x].shopCar[y].foodID
      //           ) {
      //             newObj.newMoney = this.allFoodList[z].newMoney; //单价
      //             newObj.foodName = this.allFoodList[z].foodName; //菜品名称
      //           }
      //         }
      //         newObj.foodCount = this.all_shop_car[x].shopCar[y].foodCount; //数量

      //         newArr.push(newObj);
      //       }
      //     }
      //   }
      //   return newArr;
      let newArr = [];
      for (let x in this.all_shop_car) {
        if (this.all_shop_car[x].shopID == this.shopID) {
          newArr = this.all_shop_car[x].shopCar;
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
  position: fixed;
  top: 0;
  height: 90vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
}
.shopCarInfo {
  position: fixed;
  bottom: 7.5vh;
  width: 100%;
  min-height: 5rem;
  max-height: 60vh;
  overflow: auto;
  background-color: white;
  ul {
    .text {
      position: sticky;
      top: 0;
      z-index: 999;
      background-color: #6495ed;
      color: white;
    }
    li {
      position: relative;
      width: 100%;
      padding: 0 1rem;
      height: 3rem;
      line-height: 3rem;
      border-top: 1px solid gray;
      box-sizing: border-box;
    }
    .nothing {
      color: gray;
      text-indent: 1rem;
      padding: 0.4rem 0;
    }
  }
}
</style>