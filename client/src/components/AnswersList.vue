<template>
  <div class="answers-list d-flex flex-column align-items-start">
    <h3>Answers({{answers.length}}) :</h3>
    <AnswerCard
      class="align-self-stretch"
      v-for="answer in answers"
      :key="answer._id"
      :id="answer._id"
      :content="answer.content"
      :createdAt="answer.createdAt"
      :user="answer.userId"
      :question="answer.questionId"
      :upVotes="answer.upVotes"
      :downVotes="answer.downVotes"
    ></AnswerCard>
  </div>
</template>

<script>
import AnswerCard from "@/components/AnswerCard.vue";

export default {
  props: ["answers"],
  components: {
    AnswerCard
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 40px;
}
</style>
