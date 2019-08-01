<template>
  <div class="question-container d-flex flex-column">
    <div class="question d-flex">
      <!-- ============== RATING -->
      <div class="rating col-1 d-flex flex-column align-items-center">
        <a href="#" class="upvote" @click.prevent="upvoteQuestion(getQuestion._id)">
          <img src="@/assets/up.svg" alt="upvote" :class="{isVoted: isUpvoted}" />
        </a>
        <div class="votes">{{getQuestion.upVotes.length - getQuestion.downVotes.length}}</div>
        <a href="#" class="downvote" @click.prevent="downvoteQuestion(getQuestion._id)">
          <img src="@/assets/down.svg" alt="downvote" />
        </a>
      </div>

      <!-- ============== MAIN_QUESTION -->
      <div class="main-question col-11">
        <div class="headers">
          <h1>{{getQuestion.title}}</h1>
          <small>created at {{ getQuestion.createdAt }}</small>
          <h6>Author: {{getQuestion.userId.username}}</h6>
        </div>
        <div class="content">
          <p>{{ getQuestion.content }}</p>
        </div>
      </div>
    </div>

    <hr />

    <div class="answer-form d-flex flex-column align-items-start">
      <h3>Reply</h3>
      <b-form class="d-flex flex-column align-self-stretch">
        <b-form-textarea v-model="answer"></b-form-textarea>
        <b-button
          class="align-self-start submit-btn"
          variant="primary"
          @click.prevent="answerQuestion({id:getQuestion._id, answer})"
        >Submit</b-button>
      </b-form>
    </div>
    <div class="answers">
      <AnswersList :answers="getAnswers"></AnswersList>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AnswersList from "@/components/AnswersList.vue";
import store from "../store";

export default {
  components: {
    AnswersList
  },
  data() {
    return {
      answer: "",
      isUpvoted: false
    };
  },
  methods: {
    ...mapActions([
      "fetchOneQuestion",
      "fetchAnswers",
      "answerQuestion",
      "upvoteQuestion",
      "downvoteQuestion"
    ]),
    isUpVoted() {
        
    }
  },
  computed: {
    ...mapGetters(["getQuestion", "getAnswers"])
  },
  created: function() {
    this.fetchOneQuestion(this.$route.params.questionId);
    this.fetchAnswers(this.$route.params.questionId);
  }
};
</script>

<style scoped>
.isVoted {
  filter: drop-shadow(0 0 3px rgb(5, 53, 187));
}

div.question-container {
  padding-left: 100px;
  padding-right: 100px;
}

div.content {
  margin-top: 40px;
}

.content p {
  text-align: justify;
}

hr {
  border: 0;
  clear: both;
  display: block;
  width: 96%;
  background-color: #858585;
  height: 1px;
}

img {
  width: 50px;
}

.submit-btn {
  margin-top: 10px;
}

div.answers {
  margin-top: 20px;
}

.upvote {
  position: relative;
  top: 0;
  transition: 0.2s;
}

.upvote:hover {
  top: -5px;
}

.upvote:active {
  top: 0;
}

.downvote {
  position: relative;
  top: 0;
  transition: 0.2s;
}

.downvote:hover {
  top: 5px;
}

.downvote:active {
  top: 0;
}
</style>
