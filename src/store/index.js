import Vue from "vue";
import Vuex from "vuex";

import * as actions from "./action"
import * as getters from "./getters"
import state from "./state"
import mutations from "./mutation"

import createLogger from "vuex/dist/logger"; //查看vuex状态的日志工具

Vue.use(Vuex); //注册vuex


import VueXAlong from 'vuex-along'


const debug = process.env.NODE_ENV !== 'production'; //在!production环境下(开发模式)使用debug调试

//Store 表示 储存库，用来存储数据的状态
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  // plugins:debug?[createLogger()]:[],//判断debug是否开启查看日志
  plugins: [VueXAlong({
    name: 'along', //存放在localStroage或者sessionStroage 中的名字
    local: false, //是否存放在local中  false 不存放 如果存放按照下面session的配置配
    session: {
      list: [],
      isFilter: true
    } //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
  })]
})
