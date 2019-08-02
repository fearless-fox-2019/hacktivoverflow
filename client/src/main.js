import Vue from 'vue';
import wysiwyg from 'vue-wysiwyg';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-wysiwyg/dist/vueWysiwyg.css';

Vue.use(BootstrapVue);
Vue.use(wysiwyg, {});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
