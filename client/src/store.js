import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/axios.js'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    isLogin: false,
    detailQuestion: {},
    updatedQuestion: {},
    answersQuestion : [],
    answerQues : {},
    allUsers : [],
    upVote : 0,
    downVote : 0,
    upVoteAnswer : 0,
    downVoteAnswer : 0
  },
  mutations: {
    setAllQuestions (state, data) {
      state.questions = data
    },
    addQuestions (state, data) {
      console.log(data, 'ini dataaaaa')
      state.questions.push(data)
    },
    setIsLogin (state, data) {
      console.log('ke commit')
      state.isLogin = data
    },
    setDetailQuestion (state, data) {
      state.detailQuestion = data
    },
    setDeletedQuestion (state, data) {
      console.log(data, 'ini id delete gak sih?')
      let index = null
      state.questions.forEach((el, i) => {
        if (el._id == data) {
          index = i
        }
      })
      state.questions.splice(index, 1)
    },
    setUpdateQuestion (state, data) {
      console.log(data)
      state.detailQuestion = data
      // state.updatedQuestion = data
    },
    setPatchUpdate(state, data){
      // console.log(data, "/////////");
      state.detailQuestion = data
    },
    setAnswersQuestion(state, data){
      state.answersQuestion = data
    },
    addAnswer(state, data){
      state.answersQuestion.push(data)
    },
    upVoteLength(state, data){
      let length = data.upvote.length
      state.upVote = length
    },
    downVoteLength(state, data){
      let length = data.downvote.length
      console.log(length, "ini lengthnyaaa");
      state.downVote = length
    },
    upVoteAnswerLength(state, data){
      console.log(data, "ini datanya");
      
      let length = data.upVote.length
      state.upVoteAnswer = length
    },
    downVoteAnswerLength(state, data){
      let length = data.downVote.length
      state.downVoteAnswer = length
    },
    allUsers(state,data){
      state.allUsers = data
    },
    setAnswerQuestion(state, data){
      state.answerQues = data
    },
    setAnswersQuestion(state, data){
      state.answersQuestion = data
    },
    setdeleteAnswerQuestion(state, data){
      let index = null
      state.answersQuestion.forEach((el, i) => {
        if(el._id == data){
          index = i
        }
      })
      state.answersQuestion.splice(index, 1)
    }
  },
  actions: {
    getAllQuestions ({ commit }) {
      axios({
        method: `GET`,
        url: `/questions`
      })
        .then(({ data }) => {
          commit('setAllQuestions', data)
        })
        .catch(err => {
          console.log(err)
          console.log('error nich')
        })
    },
    createQuestion ({ commit, state }, payload) {
      console.log(payload, 'ini payload dari views')

      axios({
        method: `POST`,
        url: `/questions`,
        data: payload,
        headers : {token : localStorage.token}
        // nanti bawa headers
      })
        .then(({ data }) => {

          console.log('success create')
          console.log(data, 'ini hasil createnya')
          commit('addQuestions', data)
          Swal.fire(
            'Good job!',
            'You clicked the button!',
            'success'
          )
          .then((result) => {
            if(result.value){
              router.push('/')
            }
          })
          .catch(err => {
            console.log(err);
          })
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' +err
          })
        })
    },
    getAllQuestionsearch({commit}, payload){
      console.log(payload, "triggered search");
      axios({
        method : `GET`,
        url : `questions?search=${payload}`
      })
      .then(({data}) => {
        commit('setAllQuestions', data)
        router.push('/search')
      })
      .catch(err => {
        console.log(err);
      })
    },
    login ({ commit, state }, payload) {
      console.log(payload, 'ini dari login')

      axios({
        method: `POST`,
        url: `/users/login`,
        data: payload
      })
        .then(({ data }) => {
          console.log(data, 'ini data berhasil login')
          commit('setIsLogin', true)
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.data.email)
          router.push('/')
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' + ' username / password wrong',
            // footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
    register ({ commit, state }, payload) {
      console.log('masuk action register')

      axios({
        method: `POST`,
        url: `/users`,
        data: payload
      })
        .then(({ data }) => {
          console.log('berhasil register')
          commit('setIsLogin', true)
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.data.email)
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' +err,
          })
        })
    },
    getOneQuestion ({ commit, state }, payload) {
      console.log('masuk action get one question')
      console.log(payload)

      axios({
        method: `GET`,
        url: `/questions/${payload}`
      })
        .then(({ data }) => {
          console.log('berhasil get one question')
          console.log(data, 'dataaaaa');
          
          commit('setDetailQuestion', data)
          commit('upVoteLength', data)
          commit('downVoteLength', data)
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' +err,
          })
        })
    },
    deleteQuestion ({ commit, state }, payload) {
      console.log(payload, 'tes')
      
      axios({
        method: `DELETE`,
        url: `/questions/${payload}`
      })
      .then(({ data }) => {
        console.log(data)
        commit('setDeletedQuestion', payload)
        this.$route.push('/')
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    },
    updateQuestion ({ commit, state }, payload) {
      console.log(payload, 'dari views......')
      axios({
        method: `PUT`,
        url: `/questions/${payload.id}`,
        data: {
          title: payload.title,
          question: payload.question
        }
      })
        .then(({ data }) => {
          console.log('berhasil update dong')
          console.log(data)
          commit('setUpdateQuestion', data)
          Swal.fire(
            'Updated!!',
            'You question success updated!',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!' +err,
          })
        })
    },
    patchUpdate({commit}, payload){
      console.log("triggered patch");
      axios({
        method : `PATCH`,
        url : `/questions/${payload.id}`,
        data : {
          type : payload.data
        }
      })
      .then(({data}) => {
        console.log(data);
        commit('setPatchUpdate', data)
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    },
    getAllAnswer({commit}, payload){
      axios({
        method : `GET`,
        url : `/answers?question=${payload}`
      })
      .then(({data}) => {
        console.log(data, "ini data all answer");
        
        commit('setAnswersQuestion', data)
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    },
    answerQuestion({commit, state}, payload){
      console.log("triggered answer");
      console.log(payload);
      axios({
        method : `POST`,
        url : `/answers`,
        data : payload,
        headers : {token : localStorage.token}
      })
      .then(({data}) => {
        console.log("success answerrrrrrr");
        console.log(data);
        commit('addAnswer', data)
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    },
    getOneAnswer({commit}, payload){
      axios({
        method : `GET`,
        url : `/answers/${payload}`
      })
      .then(({data}) => {
        console.log(data, "ini data one question");
        
        commit('upVoteAnswerLength', data)
        commit('downVoteAnswerLength', data)
      })
      .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    },
    getAllUser({commit}){
      console.log("triggeredddddddddddddd");
      
      axios({
        method : `GET`,
        url : `/users`
      })
      .then(({data}) => {
        console.log(data, "ini data userrrr");
        commit('allUsers', data)
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    },
    deleteAnswer({commit}, payload){
      console.log("triggered delete answer state");
      console.log(payload, "ini payload");

      axios({
        method: `DELETE`,
        url: `/answers/${payload.idAnswer}`,
        headers : {token : localStorage.token}
      })
      .then(({ data }) => {
        console.log(data)
        commit('setdeleteAnswerQuestion', payload.idAnswer)
        this.$route.push(`/questions/${payload.Question}`)
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!' +err,
        })
      })
    }
  }
})
