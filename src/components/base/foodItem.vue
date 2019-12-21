<template>
  <div class="foodItem">
    <img :src="foodItem.pic_url" />
    <h1>{{foodItem.foodName}}</h1>
    <h3>{{foodItem.foodInfo}}</h3>
    <p>月售{{foodItem.saleTimes}}</p>
    <div>
      <span>￥{{foodItem.newMoney}}</span>
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
    .foodItem{
        img{
            width: 100%;
        }
    }
</style>