import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router'
import Swal from 'sweetalert2'
Vue.use(Vuex);

const baseUrl = 'http://localhost:3000'
export default new Vuex.Store({
  state: {
    questions: [],
    detailQuestion: {},
    users:[],
    isLogin : false,
    jobs : [],
    answers: []
  },
  getters: {
    getQuestions: state => () => state.questions,
    getDetailQuestions: state => () => state.detailQuestion
  },
  mutations: {
    stateQuestions(state, payload) {
      state.questions = payload
    },
    stateUsers(state , payload){
      state.users = payload
    },
    stateNewQuestions(state, payload) {
      state.questions.unshift(payload)
      router.push('/')
    },
    stateDetailQuestion(state, payload) {
      state.detailQuestion = payload
      if(payload.answers){
        let x = state.questions.map(el => {
          if (el._id == payload.answers[0].questionId) {
            el = payload
          }
          return el
        })
        state.questions = x
      }
    },
    isLogin(state,payload){
      state.isLogin = true
      localStorage.setItem('token', payload.token)
      localStorage.setItem('userId',payload.userId)
    },
    stateJob(state,payload){
      state.jobs = payload
    },
    stateAnswers(state,payload){
      state.answers = payload
    }
  },
  actions: {
    getQuestions({ commit }) {
      axios({
        method: 'get',
        url: baseUrl + '/questions',
      })
        .then(({ data }) => {
          commit('stateQuestions', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUsers({commit}){
      axios({
        method: 'get',
        url: baseUrl + '/users',
      })
        .then(({ data }) => {
          commit('stateUsers', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQuestion({ commit }, { title, description }) {
      axios({
        method: 'post',
        url: baseUrl + '/questions',
        headers: { token: localStorage.getItem('token') },
        data: {
          title,
          description
        }
      })
        .then(({ data }) => {
          commit('stateNewQuestions', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetailQuestion({ commit }, payload) {
      axios({
        method: 'get',
        url: baseUrl + `/questions?_id=${payload}`,
      })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvote({ commit }, payload) {
      axios({
        method: "PATCH",
        url: baseUrl + `/questions/${payload}/upvote`,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data)
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: `Please Login First`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.clear();
          router.push("/signin");
        })
    },
    downvote({ commit }, payload) {
      axios({
        method: "PATCH",
        url: baseUrl + `/questions/${payload}/downvote`,
        headers: { token: localStorage.getItem('token') },
      })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data)
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            type: "error",
            title: `Please Login First`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.clear();
          router.push("/signin");
        })
    },
    upvoteAnswer({ commit }, payload) {
      axios({
        method: "PATCH",
        url: baseUrl + `/answers/upvote`,
        headers: { token: localStorage.getItem('token') },
        data: {
          id: payload
        }
      })
        .then(({ data }) => {
          return axios({
            method: 'get',
            url: baseUrl + `/questions?_id=${data.data.questionId}`,
          })
        })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data[0])
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: "error",
            title: `Please Login First`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.clear();
          router.push("/signin");
        })
    },
    downvoteAnswer({ commit }, payload) {
      axios({
        method: "PATCH",
        url: baseUrl + `/answers/downvote`,
        headers: { token: localStorage.getItem('token') },
        data: {
          id: payload
        }
      })
        .then(({ data }) => {
          return axios({
            method: 'get',
            url: baseUrl + `/questions?_id=${data.data.questionId}`,
          })
        })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data[0])
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: "error",
            title: `Please Login First`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.clear();
          router.push("/signin");
        })
    },
    createAnswer({ commit }, payload) {
      axios({
        method: "post",
        url: baseUrl + `/answers/`,
        headers: { token: localStorage.getItem('token') },
        data: {
          description: payload.description,
          questionId: payload.id
        }
      })
        .then(({ data }) => {
          return axios({
            method: 'get',
            url: baseUrl + `/questions?_id=${data.answer.questionId}`,
          })
        })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data[0])
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: "error",
            title: `Please Login First`,
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.clear();
          router.push("/signin");
        })
    },
    editQuestion({ commit }, payload) {
      axios({
        method: "put",
        url: baseUrl + `/questions/${payload.questionId}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          description: payload.description,
          title: payload.title
        }
      })
        .then((data) => {
          return axios({
            method: 'get',
            url: baseUrl + `/questions?_id=${payload.questionId}`,
          })
        })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion({ commit }, payload) {
      axios({
        method: "delete",
        url: baseUrl + `/questions/${payload}`,
        headers: { token: localStorage.getItem('token') }
      })
        .then((data) => {
          return axios({
            method: 'get',
            url: baseUrl + `/questions?`,
          })
        })
        .then(({ data }) => {
          commit('stateQuestions', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editAnswer({commit} ,payload){
      axios({
        method: "put",
        url: baseUrl + `/answers/${payload.answerId}`,
        headers: { token: localStorage.getItem('token') },
        data: {
          description: payload.description
        }
      })
        .then(({ data }) => {
          return axios({
            method: 'get',
            url: baseUrl + `/questions?_id=${payload.questionId}`,
          })
        })
        .then(({ data }) => {
          commit('stateDetailQuestion', data.data[0])
        })
        .catch(err => {
          console.log(err)
        })
    },
    login({commit},payload){
      axios({
        method: 'post',
        url: baseUrl + '/users/signin',
        data: {
          username : payload.username,
          password : payload.password
        }
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: `Succes Login`,
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/')
          commit('isLogin', data)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: `${err.response.data.err}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    register({commit}, payload){
      axios({
        method: 'post',
        url: baseUrl + '/users/signup',
        data: {
          username : payload.username,
          password : payload.password,
          email : payload.email
        }
      })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: `Succes Login`,
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/')
          commit('isLogin', data)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: `${err.response.data.err}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    getJob({commit}) {
      axios({
        method: 'get',
        url: baseUrl + '/api/jobs',
      })
        .then(( {data} ) => {
          commit('stateJob', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAnswers({ commit }){
      axios({
        method: 'get',
        url: baseUrl + `/answers`,
      })
        .then(({ data }) => {
          commit('stateAnswers', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
});