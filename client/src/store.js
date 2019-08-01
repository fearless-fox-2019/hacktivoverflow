import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

function sortUpvote(a, b) {
  if(a.upvote.length < b.upvote.length) {
    return 1
  }
  if(a.upvote.length > b.upvote.length) {
    return -1
  }
  return 0
}


const api = 'http://localhost:3000/api/'
export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    isLogin: '',
    loggedUser: {},
    detailedQuestion: {},
    tags : [],
    watchTags : [],
    stack : []
  },
  mutations: {
    STOREDETAIL (state, payload) {
      let questions = state.questions
      for (let i in questions) {
        if (questions[i]._id === payload) {
          state.detailedQuestion = questions[i]
        }
      }
    },
    updateLoginStatus (state, payload) {
      state.isLogin = payload
    },
    INPUTLOGGEDUSER (state, payload) {
      state.loggedUser = payload
    },
    STOREQUESTIONS (state, payload) {
      state.questions = payload
    },
    STORETOP (state, payload) {
      state.popular = payload.sort(sortUpvote)
      state.popular.forEach(x => {
        x.createdAt = new Date(x.createdAt).toLocaleString()
      })
    },
    STOREANSWERS (state, payload) {
      state.answers = payload
    },
    STORETAGS (state, payload )  {
      state.tags = payload
    },
    PUSHWATCHTAGS (state, payload ) {
      if(!state.watchTags.includes(payload)) state.watchTags.push(payload)
    },
    CLEARWATCHTAGS (state, payload) {
      state.watchTags = []
    },
    STORECRON (state, payload) {
      state.stack = payload
    }
  },
  actions: {
    login ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}users/login`,
        data: payload
      })
    },
    register ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}users/register`,
        data: payload
      })
    },
    fetchQuestions ({ state, commit }, payload) {
      return axios({
        method: 'GET',
        url: `${api}questions`
      })
    },
    fetchAnswers ({ state, commit }, payload) {
      return axios({
        method: 'GET',
        url: `${api}answers/${payload}`
      })
    },
    createQuestion ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}questions`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    createAnswer ({ state, commit }, payload) {
      return axios({
        method: 'POST',
        url: `${api}answers/${payload.id}`,
        data: {
          content: payload.content
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteQuestion ({ state, commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `${api}questions/${payload}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    voteUpdateQuestion ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}questions/vote/${payload._id}`,
        data: {
          upvote: payload.upvote,
          downvote: payload.downvote
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    insertAnswer ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}questions/answer/${payload._id}`,
        data: {
          answer: payload.answer
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    voteUpdateAnswer ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}answers/vote/${payload._id}`,
        data: {
          upvote: payload.upvote,
          downvote: payload.downvote
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    deleteAnswer ({ state, commit }, payload) {
      return axios({
        method: 'DELETE',
        url: `${api}answers/${payload}`,
        headers: {
          token: localStorage.token
        }
      })
    },
    editQuestion ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}questions/${payload.id}`,
        data: {
          title: payload.titleEdit,
          content: payload.contentEdit
        },
        headers: {
          token: localStorage.token
        }
      })
    },
    editAnswer ({ state, commit }, payload) {
      return axios({
        method: 'PATCH',
        url: `${api}answers/${payload.id}`,
        data: {
          content: payload.contentEdit
        },
        headers: {
          token: localStorage.token
        }
      })
    },
    fetchTags ({ state, commit }, payload) {
      axios({
        method: 'GET',
        url: `${api}tags`
      })
      .then(({data}) => {
        commit('STORETAGS', data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    },
    fetchCron ({ state, commit}, payload) {
      axios({
        url: `${api}cron`,
        method: 'GET'
      })
      .then(({data}) => {
        commit('STORECRON', data)
      })
      .catch(err => {
        console.log(err.response)
      })
    }
  },
  getters : {
    top: (state, getters) => (payload) => {
      let arr = []
      state.questions.forEach(el => {
        arr.push(el)
      })
      let questions = payload === 'all' ? arr : getters.myQuestion
      let top = questions.sort(sortUpvote)
      top.forEach(x => {
        x.createdAt = new Date(x.createdAt).toLocaleString()
      })
 
      return top
    },
    new : (state, getters) => (payload) => {
      let arr = []
      state.questions.forEach(el => {
        arr.push(el)
      })
      let questions = payload === 'all' ? arr : getters.myQuestion
      let sortNew = questions.sort((a, b) => new Date (b.createdAt) - new Date(a.createdAt))
      sortNew.forEach(x => {
        x.createdAt = new Date(x.createdAt).toLocaleString()
      })

      return sortNew
    },
    myQuestion (state) {
      let arr = []
      state.questions.forEach(el => {
        if (el.user._id === state.loggedUser._id) {
          arr.push(el)
        }
      })
      return arr
    },
  }
})
