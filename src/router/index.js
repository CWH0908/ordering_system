import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import sign from "../components/base/sign.vue"
import main from "../components/base/main.vue"
import home from "../components/home/home.vue"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/sign'
    },
    {
      path: '/main',
      redirect: '/main/home'
    },
    {
      path: '/sign',
      name: 'sign',
      components: {
        sign
      },
    },
    {
      path: '/main',
      name: 'main',
      components: {
        main
      },
      children: [{
        path: 'home',
        name: 'home',
        components: {
          home
        },
      }, {
        path: 'today',
        name: 'today',
        components: {
          today: (resolve) => require(['../components/today/today.vue'], resolve)
        },
      }, {
        path: 'order',
        name: 'order',
        components: {
          order: (resolve) => require(['../components/order/order.vue'], resolve)
        },
      },{
        path: 'person',
        name: 'person',
        components: {
          person: (resolve) => require(['../components/person/person.vue'], resolve)
        },
      }]
    },

  ],
  linkActiveClass:'mylinkClass'
})
