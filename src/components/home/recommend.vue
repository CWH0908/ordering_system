<template>
  <div class="recommend">
    <p class="hotMall">-畅销店铺-</p>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="综合排序" name="first">
        <div class="sortType">
          <ul>
            <li class="itemLi" v-for="(item,index) in recommendList" :key="index">
              <div class="itemDiv">
                <!-- 店铺头像 -->
                <aside>
                  <img :src="item.pic_url" class="itemPic" />
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
                    月售 {{item.saleTimes}} 单
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
        </div>
      </el-tab-pane>
      <el-tab-pane label="距离最近" name="second">距离最近</el-tab-pane>
      <el-tab-pane label="销量排序" name="third">销量排序</el-tab-pane>
      <el-tab-pane label="好评优先" name="fourth">好评优先</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getHomeRecommend } from "../../API/getHomeRecommend";
export default {
  data() {
    return {
      activeName: "first", //初始选择板块
      recommendList: []
    };
  },
  created(){
    this._getHomeRecommend();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    async _getHomeRecommend() {
      await getHomeRecommend().then(res => {
        delete res[0]._id; //移除数据库自带的_id属性
        this.recommendList = res[0];
      });
    }
  }
};
</script>

<style lang="less" scoped>
.recommend {
  .hotMall {
    font-size: 1rem;
    color: red;
    text-align: center;
    padding: 1rem 0;
  }
  /deep/ .el-tabs__nav-scroll {
    padding-left: 1rem;
  }

  //店铺板块
  //排序类型板块吸顶效果
  /deep/ .el-tabs__header {
    padding: 0;
    position: sticky;
    margin: 0 0 15px;
    top: 15vh;
    z-index: 999;
    background-color: rgba(255, 255, 255, 1);
  }
  //每个店铺的样式
  /deep/ .sortType {
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
              width: 100%;
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
}
</style>