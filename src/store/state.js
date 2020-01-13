//state 代表状态，把需要存储的数据定义在这里
const state = {
  home_nav_requireAllShopList: [], //请求回来的所有店铺数据
  home_nav_currentIndex: -1, //首页导航条当前的选中状态 
  home_search_value: "", //搜索框的搜索值，默认为空
  all_shop_car: [], //用于保存所有店铺的购物车信息
  currentOrderData: [], //用来保存当前用户所有订单信息
  currentUser: {
    // "userAccount": "15815817682",
    // "password": "123",
    // "pic_url": "http://49.235.92.173:70/graduationDesign_images/defaultHeadImg.jpg",
    // "orderData": [],
    // "addressData": [{id:"0",name:"陈同学",tel:"15815817682",address:"白云校区  17栋812",isDefault:true}]
  }, //用于保存当前的用户信息
}

export default state
