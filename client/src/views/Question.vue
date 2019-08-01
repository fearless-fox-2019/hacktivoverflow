<template>
  <b-container>
    <div id="main-container" class="mx-auto pt-4">
      <b-card id="question">
        <b-row>
          <b-col cols="1">
            <i class="material-icons" @click="addVote(1)">arrow_drop_up</i>
            <b-button
              class="pt-0 pb-0"
              variant="outline-secondary"
              disabled
              style="width: 56px; border: 0; padding: 0;"
            >
              <h5>9999</h5>
              <h6 class="m-0">votes</h6>
            </b-button>
            <i class="material-icons" @click="addVote(-1)">arrow_drop_down</i>
          </b-col>
          <b-col class="ml-4">
            <h4>Q: {{ question.title }}</h4>
            <div class="divider"></div>
            <p>{{ question.description }}</p>
            <div class="mt-2 float-right">
              <h6>
                {{ Date(question.createdAt) }} by
                <b>{{ question.author }}</b>
              </h6>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <Answer v-for="answer in answers" :key="answer._id" :answer="answer" class="answer"></Answer>
          <b-form class="answer p-4" id="form-question" @submit.prevent="answerQuestion">
            <h4>Answer this Question</h4>
            <label for="title">Answer</label>
            <b-form-input v-model="title" id="title" type="text"></b-form-input>
            <label for="title" class="mt-2">Description</label>
            <wysiwyg v-model="description" id="detail"></wysiwyg>
            <b-button form="form-question" size="sm" variant="primary" type="submit">Answer</b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import Answer from "@/components/Answer.vue";
export default {
  data() {
    return {
      question: "",
      answers: [],
      title: "",
      description: "",
      questionId: this.$route.params.questionId
    };
  },
  components: {
    Answer
  },
  methods: {
    answerQuestion() {
      axios({
        method: "post",
        url: `http://localhost:3000/api/answers`,
        data: {
          title: this.title,
          description: this.description,
          questionId: this.questionId,
          author: localStorage.getItem("username")
        }
      })
        .then(({ data }) => {
          this.answers.push(data);
          this.title = "";
          this.description = "";
        })
        .catch(err => console.log(err));
    },
    addVote(value) {
      axios({
        method: 'patch',
        url: `http://localhost:3000/api/questions/${this.$route.params.questionId}`
      })
    }
  },
  created() {
    axios({
      method: "get",
      url: `http://localhost:3000/api/questions/${this.$route.params.questionId}`
    })
      .then(({ data }) => {
        console.log(data);
        this.question = data;
      })
      .catch(err => console.log(err));

    axios({
      method: "get",
      url: `http://localhost:3000/api/answers?questionId=${this.$route.params.questionId}`
    })
      .then(({ data }) => {
        this.answers = data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
.material-icons {
  font-size: 56px;
  padding: 0;
  margin: 0;
}

.answer {
  border-left: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
}
</style>
