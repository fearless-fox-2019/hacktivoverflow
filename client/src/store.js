import Vue from 'vue'
import Vuex from 'vuex'
import axios from  'axios'
import VueSweetalert2 from 'vue-sweetalert2'
const baseUrl = `http://localhost:3000/api`

Vue.use(Vuex)
Vue.use(VueSweetalert2);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: []
  },
  mutations: {
    LOGIN_TRUE(state,payload) {
      state.isLogin = true
    },
    LOGIN_FALSE(state,payload) {
      state.isLogin = false
    },
    ALL_ARTICLES(state,payload) {
      state.questions = payload
    }
  },
  actions: {
    registerUser(context,payload) {
      console.log(payload)
      axios.post(`${baseUrl}/users/register`, {
        username: payload.username,
        password: payload.password,
        email: payload.email
      })
        .then((userRegistered) => {
          Vue.swal({
            type:'success',
            text: 'Sucessfully registered an account!',
            showConfirmButton: false,
            timer: 1000
          })
          // console.log(userRegistered)
        })
        .catch(error => {
          console.log(error)
        })
    },
    loginUser(context,payload) {
      axios.post(`${baseUrl}/users/login`,{
        email: payload.email,
        password: payload.password
      })
        .then(({data}) => {
          localStorage.setItem('token',data.token)
          localStorage.setItem('id',data.id)
          context.commit('LOGIN_TRUE')
          Vue.swal({
            type: 'success',
            text: 'successfully logged in!',
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllQuestions(context,payload) {
      axios.get(`${baseUrl}/questions/allQuestions`)
        .then(({data}) => {
          context.commit('ALL_ARTICLES',data)
        })
    }
  }
})
