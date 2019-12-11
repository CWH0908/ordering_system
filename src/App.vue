<template>
  <div id="app">
    <router-view name="sign"></router-view>
    <router-view name="main"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
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
h5,p {
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
.mylinkClass{
  color: #25A1FF;
}
</style>
