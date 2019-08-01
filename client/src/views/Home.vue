<template>
  <questioncard />
</template>

<script>
import questioncard from "../components/QuestionCard.vue";

export default {
  components: {
    questioncard
  },
  created(){
    this.$store.dispatch('getQuestions')
    this.$store.dispatch('getUsers')
  }
};
</script>
