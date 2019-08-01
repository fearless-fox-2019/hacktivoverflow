import Vue from 'vue';
import Vuex from 'vuex';
import { NotificationProgrammatic as Notification } from 'buefy/dist/components/notification';
import axios from './config/axios';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoading: false,
    loggedUser: {
      id: null,
      fullname: null,
      email: null,
    },
    ads: null,
    questions: [],
    userquestions: [],
    useranswers: [],
    selected: null,
  },
  actions: {
    signUp({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/users/signup',
        data: payload,
      })
        .then(() => {
          Notification.open({
            duration: 3000,
            message: `Account for ${payload.fullname} Has Been Created ! Please Login to Proceed`,
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
            closable: false,
          });
        })
        .catch((err) => {
          Notification.open({
            duration: 3000,
            message: err.response.data.message.split(':')[2].trim(),
            position: 'is-top-right',
            type: 'is-danger',
            hasIcon: true,
          });
          console.log(err);
        });
    },
    signIn({ commit }, payload) {
      axios({
        method: 'POST',
        url: '/users/signin',
        data: payload,
      })
      .then(({ data }) => {
        Notification.open({
          duration: 1500,
          message: 'You Have Signed In',
          position: 'is-top-right',
          type: 'is-info',
          hasIcon: true,
          closable: false,
        });
        commit('postSignIn', data);
        commit('insertUserQuestions', data);

      })
      .catch((err) => {
        Notification.open({
          duration: 3000,
          message: err,
          position: 'is-top-right',
          type: 'is-danger',
          hasIcon: true,
        });
      });
    },
    getJob({ commit }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/jobs',
      })
      .then(({ data }) => {
        commit('mountAds', data)
      })
      .catch((err) => {
        console.log('Error in Processing Data');
        console.log(err);
      })
    },
    getQuestions({ commit, state }) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions/all',
      })
      .then(({ data }) => {
        commit('mountQuestions', data)
      })
      .catch((err) => {
        console.log('Error In Retrieving All Questions');
        console.log(err);
      })
    },
    sendQuestion({ commit, state, dispatch }, payload) {
      commit('loading', true)
      axios({
        method: 'POST',
        url: 'http://localhost:3000/questions/create',
        data: payload,
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        commit('loading', false)
        Notification.open({
          duration: 5000,
          message: `Question Created`,
          position: 'is-top-right',
          type: 'is-success',
          hasIcon: true
        })
        dispatch('getUserQuestions')
        dispatch('getQuestions')
      })
      .catch((err) => {
        commit('loading', false)
        console.log(err);
        console.log(err.response.data.message);
        Notification.open({
          duration: 5000,
          message: `Error : ${err.response.data.message}`,
          position: 'is-top-right',
          type: 'is-success',
          hasIcon: true
        })
      })
    },
    deleteQuestion({ commit, dispatch }, payload) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/questions/delete/${payload}`,
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserQuestions')
        dispatch('getQuestions')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getUserQuestions({ commit, state}, payload) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/questions/questionuser',
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        // console.log('Data Retrieved');
        // console.log(data);
        commit('mountUserQuestions', data)
      })
      .catch((err) => {
        console.log('Error');
        console.log(err);
      })
    },
    getSelectedQuestion({ commit, state}, payload) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/questions/${payload}`,
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        // console.log('Data Selected');
        // console.log(data);
        // console.log(typeof data);
        commit('mountSelectedQuestion', data)
      })
      .catch((err) => {
        console.log(err);
      })
    },
    vote({ commit, dispatch}, payload) {
      axios({
        method: 'PATCH',
        url: `http://localhost:3000/questions/vote/${payload.id}`,
        data: {
          vote : payload.value
        },
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserQuestions')
        dispatch('getQuestions')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    editQuestion({ commit, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `http://localhost:3000/questions/update/${payload.id}`,
        data: {
          title: payload.title,
          question: payload.question
        },
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserQuestions')
        dispatch('getQuestions')
        router.push('/my-question')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    sendAnswer({ commit, dispatch }, payload) {
      // console.log(payload, '@store');
      axios({
        method: 'POST',
        url: `http://localhost:3000/answers/post`,
        data: payload,
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserQuestions')
        dispatch('getQuestions')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    voteAnswer({ commit, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `http://localhost:3000/answers/vote/${payload.id}`,
        data: {
          vote : payload.value
        },
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserQuestions')
        dispatch('getQuestions')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    getUserAnswers({ commit, dispatch }, payload) {
      axios({
        method: 'GET',
        url: `http://localhost:3000/answers/user`,
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        commit('mountUserAnswers', data)
      })
      .catch()
    },
    deleteAnswer({ commit, dispatch }, payload) {
      axios({
        method: 'DELETE',
        url: `http://localhost:3000/answers/delete/${payload}`,
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserAnswers')
        dispatch('getUserQuestions')
        dispatch('getQuestions')
      })
      .catch((err) => {
        console.log(err);
      })
    },
    editAnswer({ commit, dispatch }, payload) {
      axios({
        method: 'PATCH',
        url: `http://localhost:3000/answers/update/${payload.id}`,
        data: { 
          answer: payload.answer
        },
        headers : {
          token : localStorage.token
        }
      })
      .then(({ data }) => {
        dispatch('getUserQuestions')
        dispatch('getQuestions')
        router.push('/my-answer')
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },
  mutations: {
    loading(state, payload) {
      state.isLoading = payload
    },
    checkLoggedUser(state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true;
        state.loggedUser.fullname = localStorage.getItem('user');
        state.loggedUser.email = localStorage.getItem('email');
      }
    },
    postSignIn(state, payload) {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('id', payload.id);
      localStorage.setItem('user', payload.fullname);
      localStorage.setItem('email', payload.email);
      
      state.loggedUser.id = payload.id;
      state.loggedUser.fullname = payload.fullname;
      state.loggedUser.email = payload.email;
      state.isLogin = true;
      router.push('/');
    },
    postSignOut(state) {
      state.isLogin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('id');

      state.loggedUser.id = null;
      state.loggedUser.fullname = null;
      state.loggedUser.email = null;
      router.push('/signin')
    },
    mountAds(state, payload) {
      state.ads = payload
    },
    mountQuestions(state, payload) {
      state.questions = payload
    },
    mountUserQuestions(state, payload) {
      state.userquestions = payload
    },
    mountUserAnswers(state, payload) {
      state.useranswers = payload
    },
    mountSelectedQuestion(state, payload) {
      state.selected = payload
    },
    insertQuestion(state, payload) {
      state.questions.unshift(payload)
      state.userquestions.unshift(payload)
      router.push('/')
    },
    selectQuestion(state, payload) {
      const selected = state.questions.find((val) => val._id == payload)
      state.selected = selected
      router.push(`/question/${payload}`)
    },
    updateQuestion(state, payload) {
      const updated =  state.questions.map((val) => {
        if (val._id === payload._id) {
          val.upvotes = payload.upvotes
          val.downvotes = payload.downvotes
        }
        return val
      })
      const userUpdated = state.userquestions.map((val) => {
        if (val._id === payload._id) {
          val.upvotes = payload.upvotes
          val.downvotes = payload.downvotes
        }
        return val
      })
      state.userquestions = userUpdated
      state.questions = updated
      state.selected = updated[0]
    },
  },
  getters: {
    getSelected: (state) => (id) => {
      return state.questions.find((val) => val._id === id)
      // 
    }
  },
});
