import { createStore } from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'

// 状态管理中的状态在每次刷新之后都会恢复原来的值
const state = {
  user: {
    // 从localStorege 判断是否登录，防止状态被刷新恢复
    isLogin: window.localStorage.getItem('ugo_token') ? true : false
  },
  cart: {
    count: 0
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters
})
