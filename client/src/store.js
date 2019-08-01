import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    myPost: false,
    allPosts: [],
    userPosts: [],
    detailPost: "",
    updateAnswer: "",
    updatePost: ""
  },
  mutations: {
    changeLogin(state, payload){
      state.isLogin = payload
    },
    allPosts(state, payload){
      state.allPosts = payload
    },
    userPosts(state, payload){
      state.userPosts = payload
    },
    myPost(state, payload){
      state.myPost = payload
    }
  },
  actions: {

  }
})
