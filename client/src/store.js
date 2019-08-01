import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/api.js'
import router from './router'
import { Toast } from 'buefy/dist/components/toast'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userTags:[],
    allQuestion:[],
    myQuestion:[],
    myAnswer:[],
    currentQuestion:{}
  },
  mutations: {
    Set_userTags(state, payload){
      state.userTags= payload
    },
    Set_allQuestion(state, payload){
      state.allQuestion= payload
    },
    Set_myQuestion(state, payload){
      state.myQuestion= payload
    },
    Set_myAnswer(state, payload){
      state.myAnswer= payload
    },
    Set_currentQuestion(state, payload){
      state.currentQuestion= payload
    }
  },
  actions: {
    getUser({commit}){
      axios({
        url: '/users',
        method: 'get',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        commit('Set_userTags', data.userTags)
      })
      .catch(err => {
        console.log('error get user')
        console.log(err)
      })
    },
    getAllQuestion({commit}, payload){
      axios({
        url: payload,
        method: 'get',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        commit('Set_allQuestion', data)
      })
      .catch(err => {
        console.log('error get all question')
        console.log(err)
      })
    },
    getMyQuestion({commit}){
      axios({
        url: '/questions/mypost',
        method: 'get',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        commit('Set_myQuestion', data)
      })
      .catch(err => {
        console.log('error get my question')
        console.log(err)
      })
    },
    getCurrentQuestion({commit}){
      let id=router.currentRoute.params.questionId

      axios({
        url:`/questions/details/${id}`,
        method: 'get',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) => {

        commit('Set_currentQuestion', data)
      })
      .catch(err => {
        console.log('error get current question')
        console.log(err)
      })
    },
    getMyAnswer({commit}){
      axios({
        url: '/answers',
        method: 'get',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        commit('Set_myAnswer', data)
      })
      .catch(err => {
        console.log('error get my question')
        console.log(err)
      })
    },
    createQuestion({dispatch}, payload){

      axios({
        url: '/questions',
        method: 'post',
        data: payload,
        headers: {
          'token': localStorage.token
        }
      })
      .then(({data}) => {

        router.push('/home')
        dispatch('getAllQuestion')
      })
      .catch(err => {
        console.log('error create question')
        console.log(err)
      })
    },
    createAnswer({dispatch}, payload){
      axios({
        url: '/answers',
        method: 'post',
        data: payload,
        headers: {
          'token': localStorage.token
        }
      })
      .then(({data}) => {
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error create question')
        console.log(err)
      })
    },
    updateUserTags({dispatch}, payload){

      axios({
        url:'/users',
        method: 'patch',
        data:{
          userTags: payload
        },
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data}) => {
          dispatch('getUser', data.userTags)
      })
      .catch(err => {
        console.log('error update tag')
        console.log(err)
      })
    },
    updateQuestion({dispatch}, payload){
      axios({
        url:`/questions/${payload._id}`,
        method: 'patch',
        data: payload,
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data})=> {
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error update question')
        console.log(err)
      })
    },
    deleteQuestion({dispatch}, payload){
      axios({
        url: `/questions/${payload}`,
        method: 'delete',
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data})=> {
        Toast.open({
          message: 'Success delete question!',
          type: 'is-success'
        })
        router.push('/home')
      })
      .catch(err => {
        console.log('error delete question')
        console.log(err)
      })
    },
    updateAnswer({dispatch}, payload){
      
      axios({
        url:`/answer/${payload._id}`,
        method: 'patch',
        data: payload,
        headers:{
          'token': localStorage.token
        }
      })
      .then(({data})=> {
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error update answer')
        console.log(err)
      })
    },
    upvoteQuestion({dispatch}, payload){
      
      axios({
        url:`/questions/upvotes/${payload}`,
        method: 'patch',
        headers:{
          'token' : localStorage.token
        }
      })
      .then(({data}) => {
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error upvotes question')
        console.log(err)
      })
    },
    downvoteQuestion({dispatch}, payload){
      axios({
        url:`/questions/downvotes/${payload}`,
        method: 'patch',
        headers:{
          'token' : localStorage.token
        }
      })
      .then(({data}) => {
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error upvotes question')
        console.log(err)
      })
    },
    upvoteAnswer({dispatch}, payload){
      console.log('masuk upvote answer')
      axios({
        url:`/answers/upvotes/${payload}`,
        method: 'patch',
        headers:{
          'token' : localStorage.token
        }
      })
      .then(({data}) => {
        
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error upvotes question')
        console.log(err)
      })
    },
    downvoteAnswer({dispatch}, payload){
      axios({
        url:`/answers/downvotes/${payload}`,
        method: 'patch',
        headers:{
          'token' : localStorage.token
        }
      })
      .then(({data}) => {
        dispatch('getCurrentQuestion')
      })
      .catch(err => {
        console.log('error upvotes question')
        console.log(err)
      })
    }
  }
})
