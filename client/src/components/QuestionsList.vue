<template>
    <div class="question-container">
        <h2 style="text-align: left;">latest<b>questions</b></h2>
        <div v-for="question in sortedQuestions" :key="question._id" class="question d-flex justify-content-between" @click="$router.push('/question/'+question._id)">
            <div>
                <h3><b>{{question.title}}</b></h3>
                <h5>{{question.owner.username}}</h5>
                <h6>{{convertDate(question.createdAt)}}</h6>
            </div>
            <div style="text-align: center;" class="d-flex align-items-center">
                <div>
                    VOTE <br>
                    <span style="font-size: 22pt; font-weigth: bolder;">{{getTotalVote(question)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  created() {
    this.fetchQuestion();
  },
  data(){
    return {
      sortedQuestions: []
    }
  },
  computed: {
    ...mapState(['allQuestions']),
  },
  methods: {
    ...mapActions(['getQuestions']),
    fetchQuestion() {
      this.getQuestions()
        .finally(() => {
          this.sortedQuestions = this.allQuestions.sort((questionA, questionB) => {
            return this.getTotalVote(questionB) - this.getTotalVote(questionA);
          });
        })
    },
    convertDate(date) {
      const newDate = new Date(date);
      return newDate;
    },
    getTotalVote(question){
      let output = 0;
      question.votes.forEach((vote) => {
        output += vote.voteNumb;
      });
      return output;
    }
  }
};
</script>

<style scoped>
    .question-container{
        padding: 20px;
        color: #66fcf1;
        height: 100%;
        overflow: auto;
    }
    .question{
        text-align: left;
        padding: 15px;
        border: solid 2px #66fcf1;
        border-radius: 10px;
        margin-bottom: 20px;
        background-color: #c5c6c8;
        opacity: 0.8;
        color: black;
    }
    .question:hover{
        opacity: 1;
    }
</style>
