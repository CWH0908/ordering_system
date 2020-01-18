# cwh毕业设计——校园食堂订餐系统

### 	完成node使用mongoose连接mongoDB

###   增加home_nav导航条选择店铺类别

###   增加了搜索框模糊查找店铺并显示的功能

###   完成点击店铺，进入，并查看菜品的界面

###   完成菜品item的UI设计，剩余点击加入购物车的计数器按钮

###   加入计数器按钮，定位不对    

###   完成菜品页侧标导航条

###   菜品页基础布局完成，准备计数器绑定数据（研究vuex绑定还是dom节点自定义属性方式），之后完成添加到购物车功能

###   在获取店铺信息的同时在vuex仓库定义一个allShopCar对象，用于保存所有店铺的购物车信息
###   allShopCar:[
###        {   
###            shopID:'',
###            shopCar:[
###                {shopID:'',foodCount:'',  foodData:{foodID:'',foodName:"",pic_url:"",foodPrice:""}  }
###            ]
###        },
###        {
###            shopID:'',
###            shopCar:[
###                {shopID:'',foodCount:'',  foodData:{foodID:'',foodName:"",pic_url:"",foodPrice:""}  }
###            ]
###        }
###    ]

###   计数器按钮绑定添加购物车操作，购物车已存在菜品ID则进行数量变化即可，否则新插入菜品到购物车

###   foodList组件下添加shopCar购物车组件，用于显示加入购物车的菜品数据。

###   2019-12-25 完成购物车vuex数据仓库的结构，待实现shopCar组件上菜品信息的显示。

###   完成添加到购物车组件操作，购物车数据回显数据，待实现点击购物车展开显示完整购物车信息，以及结算显示订单信息，结算完成向仓库插入订单信息

###   2019-12-28  完成购物车数据回显到具体菜品计数器，优化购物车遮挡菜品页面，购物车数据回显全部完成

###   2019-12-29  完成购物车详情页的数据传入，待优化页面遮罩层和计数器位置，以及计数器双向更新到vuex

###   2019-12-30  filters过滤数据改为computed的get()set()函数，完成计数器的双向更新

###   2020-1-2    完成确定订单页面的布局和数据显示，剩余 地址选择组件和地址编辑组件待完成）参考vant组件

###   2020-1-2 晚上 完成登录页面跳转（用户数据库已完成），剩余（注册，登录判断等逻辑，以及登录提示、跳转美化）

###   2020-1-3 下午 完成登录注册数据库及其跳转逻辑、注册逻辑,登录后保存数据到 localStorage （currentUser）

###   2020-1-3 晚上 自己搭建地址组件，剩余(新增地址和修改地址数据到localStorage和数据库)

###   2020-1-4 晚上 完成地址组件编写保存到vuex，剩余（未更新地址数据到数据库，已废弃localStorage保存数据）

###   2020-1-5 上午 完成订单vuex数据和订单组件的结构，剩余（未将订单数据保存到数据库）

###   2020-1-6 下午 客户端1.0完成，剩余功能待解决

###   2020-1-6 晚上 客户端1.0数据库及其连接已完成

###   2020-1-10 根据新的菜品图片地址，修改菜品图片请求地址

###   2020-1-14  凌晨，更改了订单的存储文档和请求方式

###   2020-1-17  晚上，增加客户端的webSocket连接，增加店铺信息显示，增加客户端对店铺营业时间内和临时关门的响应

###   2020-1-18  下午，增加用户取消订单操作，通过webSocket实时获取订单的处理进度


# ordering_system

> A Vue.js project  订餐系统客户端

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
