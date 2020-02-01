// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//配置插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from "./store"

//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

import {
  IndexBar,
  IndexAnchor,
  Overlay,
  RadioGroup,
  Radio,
  Collapse,
  CollapseItem,
  Panel,
  Button,
  AddressList,
  AddressEdit,
  Area,
  Popup,
  Field,
  Lazyload,
  TreeSelect
} from 'vant';

Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Overlay);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Panel);
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(Area)
Vue.use(Button)
Vue.use(Popup)
Vue.use(Field)
Vue.use(Lazyload, {
  loading: require("./image/loading3.gif")
})
Vue.use(TreeSelect)
Vue.use(Vant);

//按需引入 echarts
import ECharts from 'vue-echarts'
//折线图
import 'echarts/lib/chart/line'
// 柱状图
import 'echarts/lib/chart/bar';
Vue.component('chart', ECharts)



//引入element
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})
