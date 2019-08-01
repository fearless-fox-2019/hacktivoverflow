import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('./views/landing.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign',
      name: 'sign',
      component: () => import('./views/sign.vue'),
    },
    {
      path: '/question/:questionId',
      name: 'question',
      component: () => import('./views/detailQuestion.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/search.vue'),
      children: [
        {
          path: 'tag',
          component: ()=> import('./views/tagsearch.vue')
        },
        {
          path: 'title',
          component: () => import('./views/titlesearch.vue')
        }
      ]
    }
  ],
});
