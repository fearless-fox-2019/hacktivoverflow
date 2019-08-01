import Vue from 'vue'
import Vuex from 'vuex'
import instance from "./myconfig"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: ""
    },
    answers: [],
    detailsNow: "",
    questionOne: "",
    questions: [],
    joined: false,
    currentRoom: "",
    currentRoomDetails: "",
    isLogin: false,
    quotes:"",
    newSearching:""
  },
  mutations: {
    SEARCHING(state,payload){
      state.newSearching = payload
      console.log(this.state.newSearching)
    },
    LOGIN(state) {
      state.isLogin = true

    },
    SET_DETAIL(state, payload) {
      // console.log(payload, "disiniii ni")
      state.detailsNow = payload
    },
    LOGOUT(state) {
      state.user.username = ""
      state.isLogin = false
    },
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_QUESTION(state, payload) {
      state.questions = payload
      // console.log(this.state.questions, "payloadnya")
    },
    SET_QUESTION_ONE(state, payload) {
      state.questionOne = payload
      // console.log(this.state.questionOne, "payloadnya One")
    },
    SET_ANSWERS(state, payload) {
      state.answers = payload
      // console.log(this.state.answers, "ini answers")
    },
    SET_QUOTES(state, payload){
      state.quotes = payload
      console.log(this.state.quotes, "ini quotes")
    }
  },
  actions: {
    GET_QUOTES(context) {
      instance
        .get("/questions/getQuotes", {})
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_QUOTES", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_QUESTION_ONE(context, payload) {
      console.log(payload, "oneone")
      instance
        .get(`/questions/${payload}`, {})
        .then(({ data }) => {
          // console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_QUESTION_ONE", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GET_ANSWERS(context, payload) {
      console.log(payload, "answer")
      instance
        .get(`/answers/${payload}`, {})
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_ANSWERS", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    GET_QUESTION(context) {
      instance
        .get("/questions", {})
        .then(({ data }) => {
          console.log(data, "disini");
          // context.questions = data;
          context.commit("SET_QUESTION", data)
          // console.log(context.questions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
})
