import {SETISLOGIN, ADDTOCART} from './mutations-types'

const mutations = {

  [SETISLOGIN](state, payload) {
    state.user.isLogin = payload
  },
  [ADDTOCART](state, payload) {
    state.cart.count = payload
  }

}

export default mutations