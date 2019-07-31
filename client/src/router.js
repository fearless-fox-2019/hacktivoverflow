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
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/post-question',
      name: 'add-question',
      component: () => import(/* webpackChunkName: "about" */ './views/addQuestion.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue'),
      children:[
        {
          path: ':questionId',
          name: 'detail-question',
          component: () => import(/* webpackChunkName: "about" */ './components/detailQuestion.vue'),
        }
      ]
    },{
      
        path: '/my-question',
        name: 'my-question',
        component: () => import(/* webpackChunkName: "about" */ './views/myQuestion.vue')
      
    }
  ]
})
