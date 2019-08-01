import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import create from './views/createQuestion.vue'
import detail from './views/detail.vue'
import Mypost from './views/mypost.vue'

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
      path: '/create',
      name: 'create',
      component: create
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/mypost',
      name: 'mypost',
      component: Mypost
    }
  ]
})
