# cwh毕业设计——校园食堂订餐系统

# 	完成node使用mongoose连接mongoDB

#   增加home_nav导航条选择店铺类别

#   增加了搜索框模糊查找店铺并显示的功能

#   完成点击店铺，进入，并查看菜品的界面

#   完成菜品item的UI设计，剩余点击加入购物车的计数器按钮

#   加入计数器按钮，定位不对    

#   完成菜品页侧标导航条

#   菜品页基础布局完成，准备计数器绑定数据（研究vuex绑定还是dom节点自定义属性方式），之后完成添加到购物车功能

#   在获取店铺信息的同时在vuex仓库定义一个allShopCar对象，用于保存所有店铺的购物车信息，
#   allShopCar:[
#        {   
#            shopID:'',
#            shopCar:[
#                {shopID:'',foodID:'',foodCount:'',foodPrice:""}
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

#   foodList组件下添加shopCar购物车组件，用于显示加入购物车的菜品数据，


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
