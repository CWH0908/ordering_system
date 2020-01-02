# cwh毕业设计——校园食堂订餐系统

# 	完成node使用mongoose连接mongoDB

#   增加home_nav导航条选择店铺类别

#   增加了搜索框模糊查找店铺并显示的功能

#   完成点击店铺，进入，并查看菜品的界面

#   完成菜品item的UI设计，剩余点击加入购物车的计数器按钮

#   加入计数器按钮，定位不对    

#   完成菜品页侧标导航条

#   菜品页基础布局完成，准备计数器绑定数据（研究vuex绑定还是dom节点自定义属性方式），之后完成添加到购物车功能

#   在获取店铺信息的同时在vuex仓库定义一个allShopCar对象，用于保存所有店铺的购物车信息
#   allShopCar:[
#        {   
#            shopID:'',
#            shopCar:[
#                {shopID:'',foodCount:'',  foodData:{foodID:'',foodName:"",pic_url:"",foodPrice:""}  }
#            ]
#        },
#        {
#            shopID:'',
#            shopCar:[
#                {shopID:'',foodID:'',foodCount:'',foodPrice:""}
#            ]
#        }
#    ]

#   计数器按钮绑定添加购物车操作，购物车已存在菜品ID则进行数量变化即可，否则新插入菜品到购物车

#   foodList组件下添加shopCar购物车组件，用于显示加入购物车的菜品数据。

#   2019-12-25 完成购物车vuex数据仓库的结构，待实现shopCar组件上菜品信息的显示。

#   完成添加到购物车组件操作，购物车数据回显数据，待实现点击购物车展开显示完整购物车信息，以及结算显示订单信息，结算完成向仓库插入订单信息

#   2019-12-28  完成购物车数据回显到具体菜品计数器，优化购物车遮挡菜品页面，购物车数据回显全部完成

#   2019-12-29  完成购物车详情页的数据传入，待优化页面遮罩层和计数器位置，以及计数器双向更新到vuex

#   2019-12-30  filters过滤数据改为computed的get()set()函数，完成计数器的双向更新

#   2020-1-2    完成确定订单页面的布局和数据显示，剩余 地址选择组件和地址编辑组件待完成）参考vant组件

# ordering_system

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
