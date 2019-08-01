import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landingpage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "landingpage" */ './views/LandingPage.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "tags" */ './views/Tags.vue')
    },
    {
      path: '/users',
      name: 'users',
      children:[
        {
          path: ':id',
          name: 'question by user'
        }
      ],
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      children:[{
        path: ':id',
        name: 'detailid',
      }],
      component: () => import(/* webpackChunkName: "detail question" */ './views/DetailQuestion.vue')
    },
    {
      path: '/question',
      name: 'question',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "question" */ './views/NewQuestion.vue')
    },
    {
      path: '/answer',
      name: 'answer',
      children: [{
        path: ':id',
        name: 'answerquestion'
      }],
      component: () => import(/* webpackChunkName: "question" */ './views/AnswerQuestion.vue')

    },
    {
      path: '/tag',
      name: 'bytag',
      component: () => import(/* webpackChunkName: "bytag" */ './views/Tags.vue')

    },
    {
      path: '/mypost',
      name: 'mypost',
      component: () => import(/* webpackChunkName: "mypost" */ './views/MyPost.vue')

    }
  ]
})
