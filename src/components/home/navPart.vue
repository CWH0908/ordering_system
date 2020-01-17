<template>
  <div class="navPart">
    <div class="navData">
      <ul>
        <li
          :style="home_nav_currentIndex==index?activeClass:''"
          class="navItem"
          v-for="(item,index) in foodType"
          :key="index"
          @click="selectItem(index)"
        >
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
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      foodType: [],
      // 大众菜式：Popular
      // 粥粉面饭：Noodles
      // 奶茶饮料：Drinks
      // 爆香烧烤：Barbecue
      // 汉堡披萨：Hamburger
      // 水果甜品：Fruit
      // currentIndex: -1,
      activeClass: "background-color:rgba(0,0,0,0.1);transition:all 0.5s;"
    };
  },
  created() {
    this._getHomeNav();
  },
  methods: {
    //API接口获取数据
    async _getHomeNav() {
      await getHomeNav().then(res => {
        delete res[0]._id; //移除数据库自带的_id属性
        this.foodType = res[0];
      });
    },
    //点击导航条
    selectItem(index) {
      if (this.home_nav_currentIndex == index) {
        this.set_home_nav_currentIndex(-1);
      } else {
        this.set_home_nav_currentIndex(index);
      }
    },
    ...mapMutations({
      set_home_nav_currentIndex: "set_home_nav_currentIndex"
    })
  },
  computed: {
    ...mapGetters(["home_nav_currentIndex"])
  }
};
</script>

<style lang="less" scoped>
.navPart {
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#4169e1), to(#b0c4de));
  .navData {
    ul {
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
      .navItem {
        border-radius: 10px;
        width: 33%;
        text-align: center;
        padding-top: 1rem;
        img {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
        span {
          line-height: 2;
        }
      }
    }
  }
}
</style>