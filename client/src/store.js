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
      commit('loading', true);
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
          commit('loading', false);
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
      commit('loading', true);
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
          commit('loading', false);
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
        url: '/jobs',
      })
        .then(({ data }) => {
          commit('mountAds', data);
        })
        .catch((err) => {
          console.log('Error in Processing Data');
          console.log(err);
        });
    },
    getQuestions({ commit, state }) {
      axios({
        method: 'GET',
        url: '/questions/all',
      })
        .then(({ data }) => {
          commit('mountQuestions', data);
        })
        .catch((err) => {
          console.log('Error In Retrieving All Questions');
          console.log(err);
        });
    },
    sendQuestion({ commit, state, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'POST',
        url: '/questions/create',
        data: payload,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          commit('loading', false);
          Notification.open({
            duration: 5000,
            message: 'Question Created',
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          router.push('/');
        })
        .catch((err) => {
          commit('loading', false);
          console.log(err);
          console.log(err.response.data.message);
          Notification.open({
            duration: 5000,
            message: `Error : ${err.response.data.message}`,
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
          });
        });
    },
    deleteQuestion({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'DELETE',
        url: `/questions/delete/${payload}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          Notification.open({
            duration: 3000,
            message: 'Question Deleted',
            position: 'is-top-right',
            type: 'is-info',
            hasIcon: true,
            closable: false,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          router.push('/');
          commit('loading', false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserQuestions({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: '/questions/questionuser',
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          commit('mountUserQuestions', data);
        })
        .catch((err) => {
          console.log('Error');
          console.log(err);
        });
    },
    getSelectedQuestion({ commit, state }, payload) {
      axios({
        method: 'GET',
        url: `/questions/${payload}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
        // console.log('Data Selected');
        // console.log(data);
        // console.log(typeof data);
          commit('mountSelectedQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    vote({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'PATCH',
        url: `/questions/vote/${payload.id}`,
        data: {
          vote: payload.value,
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          Notification.open({
            duration: 1000,
            message: 'Voted !',
            position: 'is-top-right',
            type: 'is-info',
            hasIcon: true,
            closable: false,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          commit('loading', false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editQuestion({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'PATCH',
        url: `/questions/update/${payload.id}`,
        data: {
          title: payload.title,
          question: payload.question,
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          Notification.open({
            duration: 3000,
            message: 'Question Updated !',
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
            closable: false,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          router.push('/my-question');
          commit('loading', true);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendAnswer({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'POST',
        url: '/answers/post',
        data: payload,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          Notification.open({
            duration: 3000,
            message: 'Answer Created',
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
            closable: false,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          commit('loading', false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    voteAnswer({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'PATCH',
        url: `/answers/vote/${payload.id}`,
        data: {
          vote: payload.value,
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          Notification.open({
            duration: 1000,
            message: 'Voted !',
            position: 'is-top-right',
            type: 'is-info',
            hasIcon: true,
            closable: false,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          commit('loading', false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserAnswers({ commit, dispatch }, payload) {
      axios({
        method: 'GET',
        url: '/answers/user',
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          commit('mountUserAnswers', data);
        })
        .catch();
    },
    deleteAnswer({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'DELETE',
        url: `/answers/delete/${payload}`,
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          dispatch('getUserAnswers');
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          commit('loading', false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editAnswer({ commit, dispatch }, payload) {
      commit('loading', true);
      axios({
        method: 'PATCH',
        url: `/answers/update/${payload.id}`,
        data: {
          answer: payload.answer,
        },
        headers: {
          token: localStorage.token,
        },
      })
        .then(({ data }) => {
          Notification.open({
            duration: 3000,
            message: 'Answer Updated',
            position: 'is-top-right',
            type: 'is-success',
            hasIcon: true,
            closable: false,
          });
          dispatch('getUserQuestions');
          dispatch('getQuestions');
          router.push('/my-answer');
          commit('loading', false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mutations: {
    loading(state, payload) {
      state.isLoading = payload;
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

      router.push('/signin');
      Notification.open({
        duration: 1500,
        message: 'You Have Signed Out',
        position: 'is-top-right',
        type: 'is-info',
        hasIcon: true,
        closable: false,
      });
    },
    mountAds(state, payload) {
      state.ads = payload;
    },
    mountQuestions(state, payload) {
      state.questions = payload;
    },
    mountUserQuestions(state, payload) {
      state.userquestions = payload;
    },
    mountUserAnswers(state, payload) {
      state.useranswers = payload;
    },
    mountSelectedQuestion(state, payload) {
      state.selected = payload;
    },
    insertQuestion(state, payload) {
      state.questions.unshift(payload);
      state.userquestions.unshift(payload);
      router.push('/');
    },
    selectQuestion(state, payload) {
      const selected = state.questions.find(val => val._id == payload);
      state.selected = selected;
      router.push(`/question/${payload}`);
    },
    updateQuestion(state, payload) {
      const updated = state.questions.map((val) => {
        if (val._id === payload._id) {
          val.upvotes = payload.upvotes;
          val.downvotes = payload.downvotes;
        }
        return val;
      });
      const userUpdated = state.userquestions.map((val) => {
        if (val._id === payload._id) {
          val.upvotes = payload.upvotes;
          val.downvotes = payload.downvotes;
        }
        return val;
      });
      state.userquestions = userUpdated;
      state.questions = updated;
      state.selected = updated[0];
    },
  },
  getters: {
    getSelected: state => id => state.questions.find(val => val._id === id),
    //

  },
});
