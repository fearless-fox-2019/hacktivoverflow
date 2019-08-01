<template>
    <div id="question-container">

        <div id="question-header">
            <div v-if="activeQuestion.title">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center">
                        <div>
                            <span id="vote-number">[{{totalVote}}]</span>
                        </div>
                        <div>
                            <h3 id="question-title">{{activeQuestion.title}}</h3>
                            <span id="question-detail"> <b>@{{activeQuestion.owner.username}}</b> on {{activeQuestion.createdAt}} </span>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-if="isLoggedIn">
                        <button class="btn-default btn-question" @click="upvote()">up<b>vote</b></button>
                        <button class="btn-default btn-question" @click="downvote()">down<b>vote</b></button>
                        <button class="btn-default btn-question" v-b-modal="'modal-post-answer'">post<b>answer</b></button>
                        <post-answer-modal @fetchAnswers="fetchAnswers()"></post-answer-modal>
                    </div>
                </div>
                <hr style="border-color: #66fcf1; opacity: 0.5;">
            </div>
            <div v-else>
                <h3 id="question-title">Loading . . .</h3>
            </div>
        </div>

        <div class="row" id="question-body">
            <div id="question-description" class="col-4" v-if="activeQuestion.description">
                <p>{{activeQuestion.description}}</p>
            </div>
            <div id="question-answer" class="col-8">
                <div v-for="answer in answers" :key="answer._id" class="answer-container">
                  <answer-detail :answer="answer" @fetchAnswers="fetchAnswers()"></answer-detail>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import PostAnswerModal from "@/components/PostAnswerModal.vue";
import AnswerDetail from "@/components/AnswerDetail.vue";

export default {
  created() {
    this.fetchQuestion();
    this.fetchAnswers();
  },
  data(){
    return {
      answers: []
    }
  },
  components: {
    PostAnswerModal,
    AnswerDetail
  },
  computed: {
    ...mapState(['activeQuestion', 'token']),
    totalVote() {
      let output = 0;
      this.activeQuestion.votes.forEach((vote) => {
        output += vote.voteNumb;
      });
      return output;
    },
    voteActive() {
      const found = this.activeQuestion.votes.find(element => element.user == '');

      if (element.voteNumb == 1) {
        return 'up';
      } if (element.voteNumb == -1) {
        return 'down';
      }
      return '';
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }

  },
  methods: {
    ...mapActions(['findOneQuestion']),
    fetchQuestion() {
      this.findOneQuestion(this.$route.params.id);
    },
    upvote() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/questions/vote/${this.activeQuestion._id}?type=up`,
        headers: {
          token: this.token,
        },
      })
        .then(() => {
          this.fetchQuestion();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    downvote() {
      axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/questions/vote/${this.activeQuestion._id}?type=down`,
        headers: {
          token: this.token,
        },
      })
        .then(() => {
          this.fetchQuestion();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchAnswers(){
      axios({
        method: 'GET',
        url: `${process.env.VUE_APP_SERVER_URL}/answers/${this.$route.params.id}`
      })
        .then(({data}) => {
          this.answers = data;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped>
    #question-container{
        padding: 20px;
        text-align: left;
        height: 100%;
    }
    #question-header{
        height: 100px;
        overflow-x: auto;
    }
    #question-title{
        color: #66fcf1;
        white-space: nowrap;
        overflow: hidden;
    }
    #question-body{
        padding: 10px 20px;
        overflow: auto;
        height: calc( 100% - 100px );
    }
    #question-description{
        color: #66fcf1;
        overflow: auto;
        height: 100%;
        word-break: normal;
        font-size: 14pt;
    }
    #question-answer{
        color: #66fcf1;
        border-left: 3px solid #c5c6c8;
        overflow: auto;
        height: 100%;
    }
    #question-detail{
        color: #c5c6c8;
        white-space: nowrap;
        overflow: hidden;
    }
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
    .btn-question{
      font-size: 16pt;
      margin: 10px;
    }
    .btn-answer{
      font-size: 12pt;
      margin: 5px;
    }
    .active{
        background-color: #66fcf1;
        color: #0b0c10;
    }
    .active:hover{
        background-color: #0b0c10;
        color: #c5c6c8;
    }
    #vote-number{
        color: #66fcf1;
        font-size: 30pt;
        margin: 0px 20px;
    }
    .answer-container{
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 10px;
      border: solid 5px #66fcf1;
    }
    .answer-owner{
      font-size: 18pt;
    }
</style>
