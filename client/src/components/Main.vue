<template>
  <div class="columns is-multiline">
    <div class="column is-half">
      <div class="title">
        <h1>All Quetions</h1>
      </div>
    </div>
    <div class="column is-half" style="display: flex; justify-content: flex-end">
      <div class="title">
        <a v-if="isLogin" class="button is-primary">
          <router-link to="/new-question">
            <strong style="color: #fff">New Question</strong>
          </router-link>
        </a>
      </div>
    </div>
    <!-- <hr/> -->
    <div class="column">
      <div class="questions" v-for="question in questions" :key="question._id">
        <question-card :question="question" ></question-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuestionCard from './Card-Question-Main';

export default {
  computed: mapState({
    isLogin: state => state.isLogin,
    questions: state => state.questions,
  }),
  watch: {
    questions() {
      this.questions;
    },
  },
  components: {
    QuestionCard,
  },
};
</script>

<style>
  .title {
    padding: 7.5% 15%;
  }

  .title h1 {
    font-size: 0.75em;
    font-weight: 600;
    text-align: start;
  }

  .questions {
    padding: 2.5% 7.5%;
  }
</style>
