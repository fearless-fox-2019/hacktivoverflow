import Vue from 'vue';
import Buefy from 'buefy';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import store from './store';
// import VueHighlightJS from 'vue-highlightjs'; 
import 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import VueQuill from 'vue-quill';
import lineClamp from 'vue-line-clamp';
// import hljs from 'highlight.js';
 
import 'buefy/dist/buefy.css';

Vue.use(Vuex);
Vue.use(Buefy);
Vue.use(VueQuill)
// Vue.use(VueHighlightJS) 
Vue.use(require('vue-moment'));
Vue.use(lineClamp)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
