<template>
  <div class="navPart">
    <div class="navData">
      <ul>
        <li class="navItem" v-for="(item,index) in foodType" :key="index">
          <img :src="item.pic_url" />
          <br />
          <span>{{item.item_type}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getHomeNav } from "../../API/getHomeNav";

export default {
  data() {
    return {
      foodType: []
    };
  },
  created() {
    this._getHomeNav();
  },
  methods: {
    async _getHomeNav() {
      await getHomeNav().then(res => {
        delete res[0]._id;//移除数据库自带的_id属性
        this.foodType = res[0];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.navPart {
  .navData {
    ul {
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      .navItem {
        width: 33%;
        text-align: center;
        padding-top: 1rem;
        img {
          width: 3rem;
          height: 3rem;
        }
        span {
        }
      }
    }
  }
}
</style>