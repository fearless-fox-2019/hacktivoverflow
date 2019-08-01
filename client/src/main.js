import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-css-only/css/bootstrap.min.css'
import axios from "axios";
import 'mdbvue/build/css/mdb.css'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueSidebarMenu,
  axios,
  render: h => h(App)
}).$mount('#app')
