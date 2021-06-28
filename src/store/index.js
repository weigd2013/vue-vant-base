import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization: localStorage.getItem('Authorization')
      ? localStorage.getItem('Authorization')
      : '',
    count: 1,
    tokenHead: localStorage.getItem('tokenHead')
      ? localStorage.getItem('tokenHead')
      : '',
    isLogin: false,
    caseProduct: {},
    selectCase: false,
    selecticonlist: [],
    currentDatas: [],
    currentDrawJson: [],
    orderimage: '',
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  mutations: {
    changeLogin(state, user) {
      state.Authorization = user.token
      state.tokenHead = user.tokenHead
      localStorage.setItem('Authorization', user.token)
      localStorage.setItem('tokenHead', user.tokenHead)
    },
    Logintrue(state) {
      state.isLogin = true
    },
    Loginfalse(state) {
      state.isLogin = false
    },
    changeProductid(state, item) {
      state.caseProduct = {}
      state.caseProduct = item
    },
    addcurrentData(state, item) {
      state.currentDatas.push(item)
    },
    deletecurrentData(state, index) {
      state.currentDatas.splice(index, 1)
      console.log(index)
      console.log(state.currentDatas)
    },
    changeSelectCase(state, flag) {
      state.selectCase = flag
    }
  },
  getters: {
    getAccessToken(state) {
      return state.Authorization
    },
    getselectCase(state) {
      return state.selectCase
    },
    getcount(state) {
      return state.count
    },
    gettokenHead(state) {
      return state.tokenHead
    },
    getisLogin(state) {
      return state.isLogin
    },
    getproductid(state) {
      return state.caseProduct
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    getdatalength(state) {
      return state.currentDatas.length
    },
    getcurrentDatas(state) {
      return state.currentDatas
    }
  },
  actions: {},
  modules: {}
})
