import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/question',
      name: 'question',
      component: () => import('./views/questionPage.vue'),
      children: [
        {
          path: 'ask',
          component: () => import('./views/createQuestion.vue')
        },
        {
          path: ':id',
          component: () => import('./views/detailQuestion.vue')
        }
        // {
        //   path: 'search',
        //   component: () => import('./views/pageSearch.vue')
        // },
        // {
        //   path: ':id',
        //   component: () => import('./views/detailItem.vue')
        // }
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/userList.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./views/tags.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/searchPage.vue')
    }

  ]
})
