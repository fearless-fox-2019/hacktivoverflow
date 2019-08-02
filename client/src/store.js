import Vue from 'vue'
import Vuex from 'vuex'
import axios from './config/conf'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    allQuestion: [],
    getDetail: '',
    page: '',
    user: {},
    AllComment: [],
    allToday: [],
    Tags: [],
    allUsers: [],
    QueUser: [],
    MyPost: []
  },
  mutations: {
    userQue(state, payload){
      state.QueUser = payload
    },
    getAllQuestion(state, payload){
      state.allQuestion = payload
    },
    getDet(state, payload){
      state.getDetail = payload
    },
    chaPage(state, payload){
      state.page = payload
    },
    loginnn(state, payload){
      state.isLogin = true
    },
    logouttt(state, payload){
      state.isLogin = false
    },
    userdata(state, payload){
      state.user = payload
      state.isLogin = true
    },
    getAllComment(state, payload){
      console.log('masuk mutations getAllComment', payload)
      state.AllComment = payload
    },
    todayQA(state, payload){
      state.allToday = payload
    },
    sTag(state, payload){
      state.Tags = payload
    },
    allUser(state, payload){
      state.allUsers = payload
    },
    mypostque(state, payload){
      state.MyPost = payload
    }
  },
  actions: {
    changePage({state, commit, dispatch}, payload){
      commit('chaPage', payload)
    },
    getAllAsk({state, commit, dispatch}, payload){
      axios({
        methods: 'GET',
        url: '/questions'
      })
      .then(({data}) => {
        console.log(data, 'ini baru get all hmmmm')
        commit('getAllQuestion', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getQuestionById({state, commit, dispatch}, payload){
      axios({
        method: 'GET',
        url: `/questions/${payload}`
      })
      .then(({data}) => {
        console.log(data)
        commit('getDet', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    userdata({state, commit, dispatch}, payload) {
      axios({
        method: 'GET',
        url: '/users/userdata', 
        headers: {
            token: localStorage.token}
        })
        .then(({data}) => {
          commit('userdata', data)
          commit('loginnn')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    register({state, commit, dispatch}, payload){
      axios({
        method: 'POST',
        url:'/users/register',
        data: payload
      })
      .then(response => {
        commit('chaPage', 'login')
        Swal.fire('Berhasil Register', 'success')
      })
      .catch(err => {
        Swal.fire('Gagal Register', `${err}`,'error')
      })
    },
    loginn({state, commit, dispatch}, payload){
      axios({
        method: 'POST',
        url: '/users/login',
        data: payload
      })
      .then( response => {
        console.log(response)
        localStorage.setItem('token', response.data.jwt)
        commit('loginnn')
        commit('chaPage', '')
        Swal.fire('Berhasil Login', 'success')
      })
      .catch(err => {
        Swal.fire('Gagal Login', `${err}`, 'error')
      })
    },
    logout({state, commit, dispatch}, payload){
      commit('logouttt')
      commit('chaPage', '')
      localStorage.clear()
    },
    newquestion({state, commit, dispatch}, payload){
      console.log(payload, 'newquestion')
      axios({
        method: 'POST',
        url: '/questions',
        data: {
          title: payload.title,
          description: payload.description,
          tags: payload.tags
        },
        headers: {
          token: localStorage.token
        }
      })
      .then(response => {
        console.log(response, 'newquestion')
        dispatch('getAllAsk')
        Swal.fire('Berhasil Create a question', 'success')
      })
      .catch(err => {
        console.log(err)
        Swal.fire('Gagal Created', 'error')
      })
    },
    votes({state, commit, dispatch}, payload){
      console.log('masuk votes store nih', payload)
      axios({
        method: 'PATCH',
        url: `questions/${payload.id}`,
        data: {status: payload.status},
        headers: {
          token: localStorage.token
        }
      })
      .then( response => {
        console.log('berhasil update nih store')
        dispatch('getAllAsk')
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllCommentById({state, commit, dispatch}, payload){
      console.log('masuk getAllCommentById', payload)
      const datas = []
      axios({
        method: 'GET',
        url: '/answers/question/'+payload.id,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log('berhasil get actions', payload, data)
        data.forEach(el => {
          if(el.QuestionId == payload.id){
            datas.push(el)
          }
        })
        commit('getAllComment', datas)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addAnswer({state, commit, dispatch}, payload){
      console.log('ini di addAnswer: ', payload)
      axios({
        method: 'POST',
        url: '/answers/'+payload.questionid,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then( response => {
        console.log('berhasil comment: ', response)
        Swal.fire('Berhasil create comment', 'success')
        dispatch('getAllCommentById', {id: response.data.QuestionId})
      })
      .catch( err => {
        Swal.fire('Gagal Create Comment', `${err}`, 'error')
      })
    },
    questionToday({state, commit, dispatch}, payload){
      const datas = []
      axios({
        method: 'GET',
        url: '/questions',
      })
      .then(({data}) => {
        console.log('the day: ', data[0].views.length)
        data.forEach(el => {
          console.log(el.views.length)
          if(el.views.length > 5){
            datas.push(el)
          }
        });
        commit('todayQA', datas)
        console.log('oftomorrow: ', datas)
      })
      .catch(err => {
        console.log(err)
      })
    },
    searchTag({state, commit, dispatch}, payload){
      console.log('masuk searchTag', payload)
      const datas = []
      axios({
        method: 'GET',
        url: '/questions',
      })
      .then(({data})=>{
        data.forEach(el => {
          el.tags.forEach(item => {
            if(item === payload){
              datas.push(el)
            }
          })
        })
        console.log('ini searchByTag', datas)
        commit('sTag', datas)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteQuestion({state, commit, dispatch}, payload){
      console.log('id:', payload)
      axios({
        method: 'DELETE',
        url: '/questions/'+payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch('mypost')
        dispatch('getAllAsk')
        Swal.fire('Berhasil delete', 'success')
      })
      .catch(err => {
        console.log(err)
        Swal.fire('Gagal delete', 'error')
      })
    },
    getAllUser({state, commit, dispatch}, payload){
      axios({
        method: 'GET',
        url: '/users',
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then( ({data}) => {
        commit('allUser', data)
      })
      .catch( err =>{
        Swal.fire('Anda Belum Login', 'error')
      })
    },
    getByUser({state, commit, dispatch}, payload){
      // userQue
      console.log('lalu masuk ke store', payload)
      axios({
        method: 'GET',
        url: '/questions/user/'+payload,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log('ini get byuser', data) 
        commit('userQue', data)
      })
      .catch(err => {
        console.log('ternyata error ')
        console.log(err)
      })
    },
    mypost({state, commit, dispatch}, payload) {
      console.log('masuk mypost')
      console.log(localStorage.getItem('token'))
      axios({
        method: 'GET',
        url: '/questions/user/posts',
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log('ini berhasil :', data)
        commit('mypostque', data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    editQuestion({state, commit, dispatch}, payload){
      axios({
        method: 'PATCH',
        url: '/questions/update/'+payload.id,
        data: {
          title: payload.title,
          description: payload.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        dispatch('mypost')
        console.log(response)
        Swal.fire('Berhasil Update', '', 'success')
      })
      .catch(err => {
        console.log(err) 
        Swal.fire('Gagal Update', '', 'error')
      })
    }
  }
})
