import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MyDashboard from './views/MyDashboard.vue';
import Questions from './components/QuestionsList.vue';
import QuestionDetail from './components/QuestionDetail.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '',
          component: Questions,
        },
        {
          path: '/question',
          component: Questions,
        },
        {
          path: '/question/:id',
          component: QuestionDetail,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: MyDashboard
    },
  ],
});
