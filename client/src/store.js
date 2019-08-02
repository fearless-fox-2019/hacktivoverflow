import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    login(state, payload) {
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("username", payload.username);
      state.isLogin = true;
    },
    logout(state) {
      localStorage.clear();
      state.isLogin = false;
    }
  },
  actions: {}
});
