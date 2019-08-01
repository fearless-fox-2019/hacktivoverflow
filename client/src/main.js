import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootStrapvue from 'bootstrap-vue'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/build/css/mdb.css'

Vue.use(BootStrapvue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  BootStrapvue,
  render: h => h(App)
}).$mount('#app')
