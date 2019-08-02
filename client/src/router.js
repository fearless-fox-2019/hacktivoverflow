import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import NewQuestion from './views/Create-Question.vue';
import QuestionSingle from './views/Question-Single.vue';
import MyQuestion from './views/Question-Mine.vue';
import MyAnswer from './views/Answer-Mine.vue';
import EditQuestion from './views/Edit-Question.vue';
import EditAnswer from './views/Edit-Answer.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'siginin-register',
      component: Register,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/new-question',
      name: 'newquestion',
      component: NewQuestion,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('token')) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionSingle,
    },
    {
      path: '/my-question',
      name: 'myquestion',
      component: MyQuestion,
      // beforeEnter(to, from, next) {
      //   if (localStorage.getItem('token')) {
      //     next('/my-question');
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: '/my-answer',
      name: 'myanswer',
      component: MyAnswer,
      // beforeEnter(to, from, next) {
      //   if (localStorage.getItem('token')) {
      //     next('/my-answer');
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: '/edit-question/:id',
      name: 'editquestion',
      component: EditQuestion,
    },
    {
      path: '/edit-answer/:id',
      name: 'editanswer',
      component: EditAnswer,
    },
  ],
});
