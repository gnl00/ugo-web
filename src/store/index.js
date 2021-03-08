import { createStore } from 'vuex'

export default createStore({
  state: {
    num: 100,
    token: ''
  },
  mutations: {
    'setToken'(state, token) {
      state.token = token;
    }
  },
  actions: {
  },
  modules: {
  }
})
