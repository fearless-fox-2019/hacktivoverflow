<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <span class="answer-owner">[{{totalVote}}] {{answer.owner.username}}</span>
      <div>
        <button class="btn-default btn-answer" @click="upvote()">up<b>vote</b></button>
        <button class="btn-default btn-answer" @click="downvote()">down<b>vote</b></button>
      </div>
    </div>
    <div>
      <span class="answer-body">{{answer.answer}}</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created(){
  },
  props: ['answer'],
  methods: {
    upvote() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/answers/vote/${this.answer._id}?type=up`,
        headers: {
          token: this.$store.state.token,
        },
      })
        .then(() => {
          this.$emit('fetchAnswers');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downvote() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/answers/vote/${this.answer._id}?type=down`,
        headers: {
          token: this.$store.state.token,
        },
      })
        .then(() => {
          this.$emit('fetchAnswers');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    totalVote() {
      let output = 0;
      this.answer.votes.forEach((vote) => {
        output += vote.voteNumb;
      });
      return output;
    }
  }
}
</script>

<style scoped>
  .btn-default{
        background-color: #0b0c10;
        border: solid 2px #66fcf1;
        border-radius: 5px;
        color: #c5c6c8;
        
    }
    .btn-default:hover{
         background-color: #66fcf1;
         color: #0b0c10;
    }
    .btn-answer{
      font-size: 12pt;
      margin: 5px;
    }
</style>
