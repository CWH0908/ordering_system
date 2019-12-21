<template>
  <div class="foodItemRecommend">
    <img :src="foodItem.pic_url" />
    <div class="foodData">
      <h1>{{foodItem.foodName}}</h1>
      <p>月售{{foodItem.saleTimes}}</p>
      <div>
        <span style="font-size:0.6rem;color:red;">￥</span>
        <span class="foodPrice">{{foodItem.newMoney}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    foodItem: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="less" scoped>
.foodItemRecommend {
  text-align: left;
  img {
    width: 100%;
    height: 8rem;
    display: block;
  }
  .foodData {
    padding: 0 0.5rem;
    h1 {
      font-size: 0.8rem;
      font-size: 1rem;
      padding: 0.2rem 0;
    }
    p {
      font-size: 0.6rem;
      color: gray;
      padding: 0.2rem 0;
    }
    .foodPrice {
      color: red;
      font-size: 1.2rem;
    }
  }
}
</style>