<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <div v-if="userAnswers.length  == 0 || userAnswers === null"  class="display:flex; justify-content: center">
        <h1>You Haven't Post Any Answer</h1>
      </div>
      <div v-if="userAnswers.length != 0" class="column is-11  is-offset-1">
        <card-answer-personal :answer="userAnswer" v-for="userAnswer in userAnswers" :key="userAnswer._id"></card-answer-personal>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/Side-Bar.vue';
import CardAnswerPersonal from '../components/Card-Answer-Personal.vue';
import { mapState } from 'vuex';

export default {
  created() {
    this.$store.dispatch('getUserAnswers')
  },
  components: {
    SideBar,
    CardAnswerPersonal
  },
  computed: mapState({
    userAnswers: state => state.useranswers
  })

}
</script>

<style>

</style>
