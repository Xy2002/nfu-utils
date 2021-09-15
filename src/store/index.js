import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jwLoginToken: '',
    serverToken:'',
    user:{},
    id:'',
    account:'',
    name:''
  },
  mutations: {
    increment(state, Token) {
      state.jwLoginToken = Token
    },
    incrementServerLogin(state,Token){
      state.serverToken = Token
    },
    incrementUser(state,user){
      state.user=user
    },
    incrementId(state,id){
      state.id=id
    },
    incrementAccount(state,account){
      state.account=account
    },
    incrementName(state,name){
      state.name=name
    },
    resetState(state){
      Object.assign(state,{
        jwLoginToken: '',
        serverToken:'',
        id:'',
        account:'',
        name:''
      })
    },
  },
  actions: {
    increment(store) {
      store.commit("increment")
    },
  },
  getters:{
    getToken: state => {
      return state.jwLoginToken
    },
    getServerToken: state => {
      return state.serverToken
    },
    getUser: state=>{
      return state.user
    },
    getId: state => {
      return state.id
    },
    getAccount: state=>{
      return state.account
    },
    getName: state=>{
      return state.name
    }
  }
})
