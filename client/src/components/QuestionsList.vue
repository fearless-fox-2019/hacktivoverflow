<template>
  <div class="questions-list-container">
    <h1>Questions List</h1>
    <div class="question-list d-flex flex-column align-items-center">
      <QuestionCard
        v-for="question in getAllQuestions"
        :key="question._id"
        :id="question._id"
        :title="question.title"
        :content="question.content"
        :answers="question.answers"
        :upVotes="question.upVotes"
        :downVotes="question.downVotes"
        :createdAt="question.createdAt"
        :author="question.userId"
      ></QuestionCard>
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    QuestionCard
  },
  methods: {
    ...mapActions(["fetchAllQuestions"])
  },
  computed: {
    ...mapGetters(["getAllQuestions"])
  },
  created: function() {
    this.fetchAllQuestions();
  }
};
</script>

<style scoped>
div.questions-list-container {
  padding: 30px;
  padding-top: 0;
}

h1 {
  margin-bottom: 50px;
  font-family: "Oswald";
}
</style>
