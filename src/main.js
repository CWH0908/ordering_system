// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

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
  CollapseItem,Panel 
} from 'vant';

Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Overlay);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Collapse).use(CollapseItem);
Vue.use(Panel);
Vue.use(Vant);

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
