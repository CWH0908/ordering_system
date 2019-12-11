<template>
  <div class="tab">
    <div class="tabPart">
      <router-link class="tabItem" tag="div" :to="{name:'home'}">
        <i class="icon el-icon-tableware"></i>
        <br />
        <span class="home">首页</span>
      </router-link>

      <router-link class="tabItem" tag="div" :to="{name:'today'}">
        <i class="icon el-icon-thumb"></i>
        <br />
        <span class="today">今日</span>
      </router-link>

      <router-link class="tabItem" tag="div" :to="{name:'order'}">
        <i class="icon el-icon-tickets"></i>
        <br />
        <span class="person">订单</span>
      </router-link>

      <router-link class="tabItem" tag="div" :to="{name:'person'}">
        <i class="icon el-icon-user"></i>
        <br />
        <span class="person">个人</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tab {
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 6vh;
  //   line-height: 5vh;
  padding: 1vh 1vh;
  border-top: 1px solid gray;
  .tabPart {
    display: flex;
    justify-content: space-around;
    margin-right: 1rem;
    .tabItem {
      height: 3rem;
      text-align: center;
      .icon {
        font-size: 1.5rem;
        text-align: center;
      }
    }
    .home {
    }
  }
}
</style>