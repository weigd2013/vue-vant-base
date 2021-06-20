import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization')
      ? localStorage.getItem('Authorization')
      : '',
    count: 0,
    tokenHead: localStorage.getItem('tokenHead')
      ? localStorage.getItem('tokenHead')
      : '',
    isLogin: false
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.token
      state.tokenHead = user.tokenHead
      localStorage.setItem('Authorization', user.token)
      localStorage.setItem('tokenHead', user.tokenHead)
    }
  },
  getters: {
    getAccessToken(state) {
      return state.Authorization
    },
    getcount(state) {
      return state.count
    },
    gettokenHead(state) {
      return state.tokenHead
    }
  },
  actions: {},
  modules: {}
})
