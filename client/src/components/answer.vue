<template>
  <router-link :to="link">
    <b-card no-body class="overflow-hidden" style="width: 100%;">
      <b-row no-gutters>
        <b-col md="1">
          <b-card-body style="text-align:left" :title="voting">
            <b-card-text class="d-flex justify-content-end">votes</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="1">
          <b-card-body style="text-align:left" :title="answerLength">
            <b-card-text class="d-flex justify-content-end">answer</b-card-text>
          </b-card-body>
        </b-col>
        <b-col md="10" class="d-flex justify-content-start">
          <div>
            <b-card-body style="text-align:left; color:black" :title="answer.title">
              <b-card-text
                class="d-flex justify-content-end"
              >modified {{ getAgo(answer.updatedAt) }} secs ago {{answer.ownerQuestion.username}}</b-card-text>
            </b-card-body>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </router-link>
</template>

<script>
import instance from "../myconfig";
import moment from 'moment'
export default {
  props: ["answer"],
  created() {
    console.log(this.voting, "saya mau nanya");
    instance
      .get(`/answers/${this.answer._id}`, {})
      .then(({ data }) => {
        if (data.length !== 0) {
          this.answerLength = data.length;
        }
        console.log(data.length);
        // context.questions = data;
        // console.log(context.questions);
      })
      .catch(function(error) {
        console.log(error);
      });
    this.voting = this.answer.upVotes.length - this.answer.downVotes.length;
    if (this.voting == 0) {
      this.voting = "0";
    }
  },
  data() {
    return {
      link: this.answer._id,
      voting: "",
      answerLength: "0"
    };
  },
  methods: {
    getAgo(date) {
      console.log(this.username);
      return moment(date).fromNow();
    }
  }
};
</script>

<style>
</style>
