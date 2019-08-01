import Vue from 'vue'
import Vuex from 'vuex'
import ax from './api/api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    modalLogin: false,
    alert: false,
    cardTitle: '',
    alertType: '',
    alertMessage: '',
    alertColor: '',
    snackbarAppearance: false,
    snackbarStatus: '',
    snackbarTimeout: 2500,
    allPosts: [],
    currUserId: '',
    post: {},
    myPost: [],
    answers: [],
    count : 0
  },
  mutations: {
    SET_LOGIN (state) {
      if (localStorage.token) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    SET_MODAL_LOGIN (state, payload) {
      state.modalLogin = payload
    },
    SET_ALERT (state, payload) {
      state.alert = payload.appearance
      state.alertMessage = payload.alertMessage
      state.alertType = payload.alertType
      state.alertColor = payload.alertColor
    },
    SET_SNACKBAR (state, payload) {
      state.snackbarAppearance = payload.appearance,
      state.snackbarStatus = payload.snackbarStatus
      state.alertMessage = payload.alertMessage
    },
    SET_ALL_POSTS (state, payload) {
      state.allPosts = payload
    },
    SET_CURR_USR_ID (state, payload) {
      state.currUserId = payload
    },
    SET_POST (state, payload) {
      state.post = payload
    },
    SET_MY_POST (state, payload) {
      state.myPost = payload
    },
    SET_CARD_TITLE (state, payload) {
      state.cardTitle = payload
    },
    SET_ANSWERS (state, payload) {
      state.answers = payload
    }    
  },
  actions: {
    getAllQuestions (context) {
      ax({
        method: 'get',
        url: '/posts'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('SET_ALL_POSTS', data)
        })
        .catch(({ response }) => { console.log(response) })
    },
    getMyPosts (context) {
      ax({
        method: 'get',
        url: `/posts/myPost`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          context.commit('SET_MY_POST', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getOnePost (context, payload) {
      ax({
        method: 'get',
        url: `/posts/findOne/${payload}`
      })
        .then(({ data }) => {
          console.log(data, 'ini datanya')
          context.commit('SET_POST', data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },
    getAllAnswers (context, payload) {
      console.log(payload)
      // let newData = {
      //   PostId : payload
      // }
      ax({
        method: 'get',
        url: `/answers?PostId=${payload}`
      })
        .then(({ data }) => {
          console.log(data, 'ini data answer')
          context.commit('SET_ANSWERS', data)
        })
        .catch(({ response }) => { console.log(response) })
    },
    upvote(context, payload){
      ax({
        method : 'patch',
        url : `/posts/upvote/${payload}`,
        headers : { token : localStorage.token }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(({response}) => {console.log(response)})
    },
    downvote(context, payload){
      ax({
        method : 'patch',
        url : `/posts/downvote/${payload}`,
        headers : { token : localStorage.token }
      })
      .then(({data}) => {
        console.log(data, 'suksesss euyyy')
      })
      .catch(({response}) => {console.log(response)})
    },
    upvoteAnswer(context, payload){
      ax({
        method : 'patch',
        url : `/answers/upvote/${payload}`,
        headers : { token : localStorage.token }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(({response}) => {console.log(response)})
    },
    downvoteAnswer(context, payload){
      ax({
        method : 'patch',
        url : `/answers/downvote/${payload}`,
        headers : { token : localStorage.token }
      })
      .then(({data}) => {
        console.log(data, 'suksesss euyyy')
      })
      .catch(({response}) => {console.log(response)})
    }
  }
})
