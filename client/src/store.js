import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isQuestionDetail: true,
    questions: [],
    question: {},
    currentLogin: '',
    answers: []
  },
  getters: {
    getLoginStatus(state) {
      return state.isLogin
    },
    getAllQuestions(state) {
      return state.questions
    },
    getLoginEmail(state) {
      return state.currentLogin
    },
    getIsQuestionDetail(state) {
      return state.isQuestionDetail
    },
    getQuestion(state) {
      return state.question
    },
    getAnswers(state) {
      return state.answers
    }
  },
  mutations: {
    changeLoginExist(state) {
      state.isLogin = true
      state.currentLogin = localStorage.getItem('email')
    },
    logout(state) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You will be logged out after this",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Log out'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'See yaa!'
          )
          localStorage.removeItem('token')
          localStorage.removeItem('email')
          state.isLogin = false
          state.currentLogin = ''
        }
      })
    },
    fillQuestions(state, payload) {
      state.questions = payload
    },
    fillQuestion(state, payload) {
      state.question = payload
      state.isQuestionDetail = false
    },
    fillQuestionForEdit(state, payload) {
      state.question = payload
    },
    home(state) {
      state.isQuestionDetail = true
    },
    fillAnswers(state, payload) {
      state.answers = payload
    }
  },
  actions: {
    register({
      commit
    }, payload) {
      // console.log(payload)
      axios({
          method: 'post',
          url: 'http://localhost:3000/users/register',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
        .then(({
          data
        }) => {
          // console.log(data)
          Swal.fire({
            type: 'success',
            title: 'Congratulations!',
            text: 'Please login to ask some questions :D'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    login({
      commit
    }, payload) {
      axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
        .then(({
          data
        }) => {
          // console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.email)
          commit('changeLoginExist', data.email)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // ======================================= question section
    makeQuestion({
      dispatch
    }, payload) {
      // console.log(payload)
      axios({
          method: 'post',
          url: 'http://localhost:3000/questions',
          data: {
            title: payload.title,
            content: payload.content
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data, 'from response... <<<<<<<<')
          dispatch('fetchAllQuestions')
          Swal.fire({
            type: 'success',
            title: 'Success!',
            text: `
            Wait someone to answer your question: 
            ${data.title}
            `
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAllQuestions({
      commit
    }) {
      axios({
          method: 'get',
          url: 'http://localhost:3000/questions',
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          commit('fillQuestions', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchOneQuestion({
      commit
    }, payload) {
      axios({
          method: 'get',
          url: `http://localhost:3000/questions/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data, 'fetch all question')
          commit('fillQuestion', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion({
      dispatch
    }, payload) {
      axios({
          method: 'delete',
          url: `http://localhost:3000/questions/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
          dispatch('fetchAllQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    upvoteQuestion({
      dispatch
    }, payload) {
      axios({
          method: 'post',
          url: `http://localhost:3000/questions/upvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data, 'Succesfuly upvote')
          dispatch('fetchOneQuestion', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvoteQuestion({
      dispatch
    }, payload) {
      axios({
          method: 'post',
          url: `http://localhost:3000/questions/downvote/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data, 'Succesfuly downvote')
          dispatch('fetchOneQuestion', payload)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPage({
      commit
    }, payload) {
      // console.log(payload)
      axios({
          method: 'get',
          url: `http://localhost:3000/questions/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data)
          commit('fillQuestionForEdit', data)
        })
        .catch(err => {
          console.log(err)
        })

    },
    updateQuestion({
      dispatch
    }, payload) {
      console.log(payload)
      axios({
          method: 'put',
          url: `http://localhost:3000/questions/${payload.id}`,
          data: {
            title: payload.question.title,
            content: payload.question.content
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          console.log(data)
          dispatch('fetchAllQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // ======================================= answer section
    answerQuestion({
      dispatch
    }, payload) {
      // console.log(payload.id,payload.answer, 'question id <<<<<<<<<')
      axios({
          method: 'post',
          url: `http://localhost:3000/answers/${payload.id}`,
          data: {
            content: payload.answer
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data)
          dispatch('fetchAnswers', data.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchAnswers({
      commit
    }, payload) {
      axios({
          method: 'get',
          url: `http://localhost:3000/answers/${payload}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(data)
          commit('fillAnswers', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAnswer({
      dispatch
    }, payload) {
      // console.log(payload)
      axios({
          method: 'delete',
          url: `http://localhost:3000/answers/${payload.questionId}/${payload.answerId}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({
          data
        }) => {
          // console.log(payload.questionId, 'questionId <<<<<<<<<<<<<<')
          dispatch('fetchAnswers', payload.questionId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    home({
      dispatch,
      commit
    }) {
      dispatch('fetchAllQuestions')
      commit('home')
    },
  }
})
