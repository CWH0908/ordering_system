//mutation 代表改变，只可以通过这里面定义的函数来提交数据
const mutations = {
    //所有函数传入的第一个参数为 state (状态)
  set_home_nav_currentIndex(state, home_nav_currentIndex) {
    state.home_nav_currentIndex = home_nav_currentIndex;
  }
}
 
export default mutations;
