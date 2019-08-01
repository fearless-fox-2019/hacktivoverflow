<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <div v-if="userQuestions.length  == 0 || userQuestions === null"  class="display:flex; justify-content: center">
        <h1>You Haven't Create Any Question</h1>
      </div>
      <div v-if="userQuestions.length != 0" class="column is-11  is-offset-1">
        <card-question-personal :question="userQuestion" v-for="userQuestion in userQuestions" :key="userQuestion._id"></card-question-personal>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/Side-Bar.vue';
import CardQuestionPersonal from '../components/Card-Question-Personal.vue';
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('getUserQuestions')
  },
  components: {
    SideBar,
    CardQuestionPersonal
  },
  computed: mapState({
    userQuestions: state => state.userquestions
  })

}
</script>

<style>

</style>
