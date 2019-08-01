import Vue from 'vue'
import Vuex from 'vuex'
import axios from  'axios'
import VueSweetalert2 from 'vue-sweetalert2'
import route from './router'
const baseUrl = `http://localhost:3000/api`

Vue.use(Vuex)
Vue.use(VueSweetalert2);

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    questionDetail: '',
    comments: [],
    count: 0,
    upvoted: false,
    downvoted: false,
    userId: '',
    commentId: '',
    commentUpdated: '',
    highestVotes: []
  },
  getters: {
    getUserId(state) {
      return state.userId
    },
    getLoginTrue(state) {
      return state.isLogin
    }
  },
  mutations: {
    COMMENT_ID(state,payload) {
      state.commentId = payload
      console.log(state.commentId, 'ini comment id')
    },
    LOGIN_TRUE(state,payload) {
      state.isLogin = true
    },
    LOGIN_FALSE(state,payload) {
      state.isLogin = false
    },
    ALL_ARTICLES(state,payload) {
      state.questions = payload
    },
    ADD_QUESTION(state,payload) {
      state.questions.push(payload)
    },
    QUESTION_DETAIL(state,payload) {
      state.questionDetail = payload
    },
    ALL_COMMENTS(state,payload) {
      state.comments = payload
    },
    ADD_COMMENTS(state,payload) {
      state.comments.push(payload)
    },
    WATCH_STYLING(state,payload) {
      state.count++
    },
    UPVOTED(state,payload) {
      state.upvoted = payload
    },
    DOWNVOTED(state,payload) {
      state.downvoted = payload
    },
    SET_USERID(state,payload) {
      state.userId = payload
    },
    UPDATED_COMMENT(state,payload) {
      state.commentUpdated = payload
    },
    HIGHEST_VOTE(state,payload) {
      state.highestVotes = payload
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
          Vue.swal({
            type:'error',
            text: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
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
          localStorage.setItem('username',data.username)
          console.log(data.id)
          context.commit('LOGIN_TRUE')
          context.commit('SET_USERID',data.id)
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
        .catch((error) => {
          console.log(error)
        })
    },
    addQuestion(context,payload) {
      axios.post(`${baseUrl}/questions`, {
        title: payload.title,
        content: payload.content
      },{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          context.commit('ADD_QUESTION', data)
          Vue.swal({
            type: 'success',
            text: 'success add data!',
            showConfirmButton: false,
            timer: 1000
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    upVote(context,payload) {
      axios.patch(`${baseUrl}/questions/upVote/${payload}`,{},{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    downVote(context,payload) {
      axios.patch(`${baseUrl}/questions/downVote/${payload}`,{}, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    postDetail(context,payload) {
      // console.log(payload)
      axios.get(`${baseUrl}/questions/${payload}`)
        .then(({data}) => {
          console.log(data)
          // console.log('asdasdasd')
          context.commit('QUESTION_DETAIL',data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addComment(context,payload) {
      axios.post(`${baseUrl}/answers/`, {
        title: payload.title,
        content: payload.content,
        questionId: payload.questionId
      },{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          context.commit('ADD_COMMENTS',data)
        })
        .catch((error) => {
          Vue.swal({
            type: 'error',
            text: `${error.response.data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
          // console.log(error)
        })
    },
    commentsByUser(context,payload) {
      axios.get(`${baseUrl}/answers/${payload}`)
        .then(({data}) => {
          console.log(data)
          context.commit('ALL_COMMENTS',data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    upVoteAnswer(context,payload) {
      axios.patch(`${baseUrl}/answers/upVote/${payload}`,{},{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch((erorr) => {
          console.log(error)
        })
    },
    downVoteAnswer(context,payload) {
      axios.patch(`${baseUrl}/answers/downVote/${payload}`,{},{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteQuestion(context,payload) {
      axios.delete(`${baseUrl}/questions/${payload}`, {
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then((deleted) => {
          route.push('/')
          console.log(deleted)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHighestVote(context,payload) {
      axios.get(`${baseUrl}/questions/highestVote`)
        .then(({data}) => {
          context.commit('HIGHEST_VOTE',data)
          console.log(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
