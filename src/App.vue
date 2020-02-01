<template>
  <div id="app">
    <router-view name="sign"></router-view>
    <router-view name="main"></router-view>
    <router-view name="testWebSocket"></router-view>
    <router-view name="testEcharts"></router-view>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",
  // 使用watch 监听$router的变化,
  methods: {
    ...mapMutations({
      set_home_search_value: "set_home_search_value"
    })
  },
  watch: {
    $route: function(to, from) {
      this.set_home_search_value("");
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="less" >
html,
body,
ul,
li,
h1,
h2,
h3,
h4,
h5,
p {
  padding: 0;
  margin: 0;
}
li {
  list-style-type: none;
  text-decoration: none;
}
a {
  text-decoration: none;
}
.mylinkClass {
  color: #25a1ff;
}
</style>
