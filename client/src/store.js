import Vue from 'vue'
import Vuex from 'vuex'
import myaxios from '@/apis/localhost'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    loginUser: {},
    questions: [],
    myQuestions: [],
    answers: [],
    questionsByTag: [],
  },
  getters: {
    loginUserId: state => state.loginUser._id,
    isLogin: state => state.isLogin,
    loginUser: state => state.loginUser,
    myQuestions: state => state.myQuestions,
    answers: state => state.answers,
  },
  mutations: {
    SET_IS_LOGIN_STATUS(state, payload) {
      state.isLogin = payload
    },
    SET_USER(state, payload) {
      state.loginUser = payload
    },
    SET_QUESTIONS(state, payload) {
      state.questions = payload
    },
    ADD_QUESTIONS(state, payload) {
      state.questions.unshift(payload);
    },
    EDIT_QUESTIONS(state, payload) {
      state.questions = state.questions.map(question => {
        question._id === payload._id ? question = payload : false
        return question
      })
    },
    DELETE_QUESTIONS(state, payload) {
      state.questions = state.questions.filter(el => el._id !== payload._id)
    },
    SET_MY_QUESTIONS(state, payload) {
      state.myQuestions = payload
    },
    ADD_MY_QUESTIONS(state, payload) {
      state.myQuestions.push(payload);
    },
    EDIT_MY_QUESTIONS(state, payload) {
      state.myQuestions = state.myQuestions.map(question => {
        question._id === payload._id ? question = payload : false
        return question
      })
    },
    DELETE_MY_QUESTIONS(state, payload) {
      state.myQuestions = state.myQuestions.filter(el => el._id !== payload._id)
    },
    SET_ANSWERS(state, payload) {
      state.answers = payload
    },
    ADD_ANSWERS(state, payload) {
      state.answers.push(payload);
    },
    EDIT_ANSWERS(state, payload) {
      state.answers = state.answers.map(answer => {
        answer._id === payload._id ? answer = payload : false
        return answer
      })
    },
    DELETE_ANSWERS(state, payload) {
      state.answers = state.answers.filter(el => el._id !== payload._id)
    },
  },
  actions: {
    getQuestion(context) {
      myaxios
        .get('/questions')
        .then(({ data }) => {
          context.commit('SET_QUESTIONS', data)
        })
        .catch(error => {
          console.log(error);
        })
    },
    setLoggedInUser(context) {
      myaxios.defaults.headers.common.token = localStorage.token

      myaxios
        .get('/users/userLoggedIn')
        .then(({ data }) => {
          context.commit('SET_IS_LOGIN_STATUS', true)
          context.commit('SET_USER', data)
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    addNewQuestion(context, payload) {
      myaxios.defaults.headers.common.token = localStorage.token

      myaxios
        .post('/questions/ask', payload)
        .then(({ data }) => {
          context.commit('ADD_QUESTIONS', data)
          context.commit('ADD_MY_QUESTIONS', data)
        })
        .catch(error => {
          console.log(error.response);
        })
    },
    deleteQuestion(context, id) {
      myaxios.defaults.headers.common.token = localStorage.token

      myaxios
        .delete(`/questions/${id}`)
        .then(({ data }) => {
          context.commit('DELETE_QUESTIONS', data)
          context.commit('DELETE_MY_QUESTIONS', data)
        })
        .catch(error => {
          console.log(error);
        })
    },
    fetchMyQuestions(context) {
      myaxios.defaults.headers.common.token = localStorage.token

      myaxios
        .get('/questions/user')
        .then(({ data }) => {
          console.log(data);
          context.commit('SET_MY_QUESTIONS', data)
        })
        .catch(err => {
          console.log(err.response.data);
        })
    },
  }
})
