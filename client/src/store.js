import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api.js'
import router from '@/router.js'

api.defaults.headers.common['token'] = localStorage.getItem('token')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    name: '',
    id: '',
    questions: [],
    answers: [],
    tags: [],
    tag: '',
    question: '',
    watchedTags: []
  },

  mutations: {
    loggedIn(state, payload){
      state.islogin = true
    },
    retrieveTags(state) {
      state.tags = []
      for (let i = 0; i < state.questions.length; i++) {
          for (let j = 0; j < state.questions[i].tags.length; j++) {
              state.tags.push(state.questions[i].tags[j])
          }
      }
      state.tags.sort()
      state.tags = [...new Set(state.tags)]
    },
    logout(state){
      state.id = '',
      state.name = ''
      state.islogin = false
    },
    setQuestions(state, payload){
      state.questions = payload
      state.tag = 'All tags'
    },
    setAnswers(state, payload){
      state.answers = payload
    },
    setQuestion(state, payload){
      state.question = payload
    },
    updateAnswer(state, payload){
      Vue.set(state.answers, payload.index, payload.data)
    },
    newAnswer(state, payload){
      state.answers.push(payload)
    },
    newQuestion(state, payload){
      state.questions.push(payload)
    },
    deleteQuestion(state){
      state.question = ''
    },
    addWatchTag(state, payload) {
      state.watchedTags = payload
    },
    questionsByMyTag(state, tags) {
      let array = []
      for (var i=0; i<state.questions.length; i++) {
        for (var j=0; j<tags.length; j++) {
          if (state.questions[i].tags.includes(tags[j])) {
              array.push(state.questions[i])
          }
        }
      }
      state.questions = array
      state.tag = 'Watched Tags'
    }
  },

  actions: {
    questionsByMyTag(context){
      api.get(`user/${localStorage.getItem('id')}`)
      .then( ({data}) => {
        context.commit('questionsByMyTag', data.watchedTags)
      })
      .catch((err) => {
        Vue.swal({
          type: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
    },
    addWatchTag(context, tag){
      api.patch(`/user/${localStorage.getItem('id')}`, {
        tag: tag
      })
      .then( ({data}) => {
        context.commit('addWatchTag', data.watchedTags)
        Vue.swal({
          type: 'success',
          title: 'Success',
          text: 'Watch tag successfully added!'
        })
      })
      .catch( (err) => {
        Vue.swal({
          type: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
    },
    getQuestions(context){
      api.get('questions')
      .then( ({data}) => {
        context.commit('setQuestions', data)
      })
      .catch( (err) =>{
        Vue.swal({
          type: 'error',
          title: 'Oops...',
          text: err.message,
        })
      })
    },

    getQuestion(context, payload){
      api.get(`/questions/${payload}`)
      .then( ({ data }) => {
        context.commit('setQuestion', data)
      })
      .catch( (err) => {
        console.log(err);
      });
    },

    getAnswers(context, payload){
      api.get(`/answers/${payload}`)
      .then( ({ data }) => {
        context.commit('setAnswers', data)
      })
      .catch( (err) => {
        console.log(err);
      });
    },

    deleteAnswer(context, payload){
      api.delete(`/answers/${payload.answerId}`)
      .then( ({data}) =>{
          context.dispatch('getAnswers', payload.questionId)
      })
      .catch( (err) =>{
          console.log(err)
      })
    },

    deleteQuestion(context, payload){
      api.delete(`/questions/${payload}`)
      .then( ({data}) => {
          context.commit('deleteQuestion')
      })
      .catch( (err)=>{
          console.log(err)
      })
    },

    newQuestion(context, payload){
      api.post("/questions", {
        title: payload.title,
        description: payload.description,
        tags: payload.tags
      })
      .then( ({ data }) => {
        context.commit('newQuestion', data)
      })
      .catch( (err) => {
        console.log(err);
      });
    },

    newAnswer(context, payload){
      api.post(`/answers/${payload.questionId}`, {
        title: payload.title,
        description: payload.description
      })
      .then( ({ data }) => {
        context.commit('newAnswer', data)
      })
      .catch( (err) => {
        console.log(err);
      });
    },
    
    updateQuestion(context,payload){
      api.patch(`questions/${payload.questoinId}`, payload.question)
      .then( ({data}) => {
        context.commit("setQuestion", data)
      })
      .catch( (err) => {
        console.log(err)
      })
    },

    updateAnswer(context,payload){
      api
      .patch(`answers/${payload.answerId}`, payload.answer)
      .then( ({data}) => {
        context.commit("updateAnswer", {
          index: payload.index,
          data: data
        });
      })
      .catch( (err) => {
        console.log(err)
      })
    }
  }
})
