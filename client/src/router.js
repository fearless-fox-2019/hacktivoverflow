import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Detail from './views/Detail.vue'
// import Explore from './views/Explore.vue'

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
      path: '/newQuestion',
      name: 'newQuestion',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/NewQuestion.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: () => import(/* webpackChunkName: "about" */ './views/Explore.vue')
    },
    {
      path: '/:id',
      name: 'detail',
      component: Detail
    },
  ]
})
