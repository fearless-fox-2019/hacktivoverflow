import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allQuestions: [],
    searchedQuestions: [],
    activeQuestion: {},
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
  },
  mutations: {
    updateAllQuestions(state, payload) {
      state.allQuestions = payload;
    },
    updateActiveQuestion(state, payload) {
      state.activeQuestion = payload;
    },
    updateData(state, payload) {
      localStorage.setItem('token', payload.token);
      state.token = payload.token;
      localStorage.setItem('userId', payload.id);
      state.userId = payload.id;
    },
    logout(state, payload) {
      localStorage.clear();
      state.token = null;
    },
    resetStore(state, payload) {
      state.allQuestions = [];
      state.searchQuestions = [];
      state.activeQuestion = {};
    },
  },
  actions: {
    getQuestions({ state, commit }) {
      return axios({
        method: 'GET',
        url: `${process.env.VUE_APP_SERVER_URL}/questions`,
      })
        .then(({ data }) => {
          commit('updateAllQuestions', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findOneQuestion({ state, commit }, questionId) {
      return axios({
        method: 'GET',
        url: `${process.env.VUE_APP_SERVER_URL}/questions/${questionId}`,
      })
        .then(({ data }) => {
          commit('updateActiveQuestion', data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    isLoggedIn(state) {
      return (state.token != null);
    },
  },
});
