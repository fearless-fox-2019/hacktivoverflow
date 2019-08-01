import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreatePost from './views/CreatePost.vue'
import MyPost from './views/MyPost.vue'
import DetailPost from './views/DetailPost.vue'
import UpdateAnswer from './views/UpdateAnswer.vue'
import UpdatePost from './views/UpdatePost.vue'

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
      path: '/createPost',
      name: 'createPost',
      component: CreatePost
    },
    {
      path: '/myPost',
      name: 'mypost',
      component: MyPost
    },
    {
      path: '/detailPost',
      name: 'detailpost',
      component: DetailPost
    },
    {
      path: '/updateAnswer/:id',
      name: 'updateanswer',
      component: UpdateAnswer
    },
    {
      path: '/updatePost/:id',
      name: 'updatePost',
      component: UpdatePost
    }
  ]
})
