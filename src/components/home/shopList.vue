<template>
  <div class="sortType">
    <ul>
      <li class="itemLi" v-for="(item,index) in shopList" :key="index" @click="selectShop(item)">
        <div class="itemDiv">
          <!-- 店铺头像 -->
          <aside>
            <img :src="getPicUrl(item.pic_url)" class="itemPic" />
          </aside>
          <div class="rightPart">
            <!-- 店铺名 -->
            <h1>{{item.shopName}}</h1>
            <!-- 店铺销量信息 -->
            <div class="selfInfo">
              <el-rate
                v-model="item.rateValue"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
              <span>月售 {{item.saleTimes}} 单</span>
            </div>
            <!-- 店铺基础费用，起送、配送费 -->
            <div class="baseFee">
              <span>￥{{item.startFee}}起送</span>
              <span class="fenge">&nbsp;|&nbsp;</span>
              <span>配送费 ￥{{item.sendFee}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <transition name="slide-left">
      <router-view name="foodList"></router-view>
    </transition>
  </div>
</template>

<script>
import { qiniuDomain } from "../../API/qiniuDomain";
export default {
  props: {
    shopList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getPicUrl(pic_url) {
      return "http://" + qiniuDomain + "/" + pic_url;
    },
    selectShop(item) {
      // alert("选择了店铺ID："+item.shopID)
      this.$router.push({
        name: "foodList",
        params: {
          id: item.shopID
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
//每个店铺的样式
.sortType {
  ul {
    padding-bottom: 6vh;
    .itemLi {
      padding-left: 1rem;
      margin-bottom: 1rem;
      .itemDiv {
        aside {
          width: 20%;
          display: inline-block;
          .itemPic {
            width: 20vw;
            height: 20vw;
          }
        }
        .rightPart {
          padding-left: 1rem;
          display: inline-block;
          color: gray;
          h1 {
            line-height: 2.5;
            font-size: 1rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #000;
          }
          .selfInfo {
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            /deep/ .el-rate {
              display: inline-block;
              margin-right: 0.2rem;
              vertical-align: middle;
              .el-rate__icon {
                font-size: 8px;
                margin-right: 2px;
              }
            }
          }
          .baseFee {
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .fenge {
              color: rgba(0, 0, 0, 0.2);
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}
.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter-active {
  transition: all 200ms;
}

.slide-left-leave-to {
  opacity: 0;
  transition: translateX(-100%);
}
</style>