//state 代表状态，把需要存储的数据定义在这里
const state = {
    home_nav_requireAllShopList:[],//请求回来的所有店铺数据
    home_nav_currentIndex:-1,//首页导航条当前的选中状态 
    home_search_value:"",//搜索框的搜索值，默认为空
    all_shop_car:[],//用于保存所有店铺的购物车信息
    currentUser:[],//用于保存当前的用户信息
}
 
export default state