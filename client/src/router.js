import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      component: Detail,
      children: [
        //UserInfo component is rendered when /user/:id is matched
        { path: ':id', component: Detail, props: true }
      ]
    },
  ]
})
