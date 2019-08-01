<template>
  <div class="hello">
    <div class="d-flex justify-content-between">
      <h4>TOP QUESTIONS</h4>
      <b-button size="sm" variant="primary" class="my-2 my-sm-0" v-b-modal.question>
        <b-modal ref="question" id="question" title="question">
          <form v-on:submit.prevent="question">
            <div class="form-group">
              <label for="formGroupExampleInput">Enter Your Title Question</label>
              <input
                type="text"
                v-model="title"
                class="form-control"
                aria-describedby="title"
                placeholder="Enter your title"
              />
              <small
                id="text-information"
                class="form-text text-muted"
              >Make your title your question!.</small>
            </div>
            <div class="form-group">
              <label>create your question here!</label>
              <tinymce-editor
                v-model="questionDesc"
                api-key="x3sojlqrnmbc6ad5465jt7utexbpvdvc3tjgamy2547nf38a"
                :init="{plugins: 'wordcount'}"
              ></tinymce-editor>

              <!-- <textarea ></textarea> -->
            </div>
            <button type="submit" class="btn btn-primary">submit question</button>
          </form>
        </b-modal>Ask Questions
      </b-button>
    </div>
    <div class="d-flex justify-content-end" style="margin-bottom:13px; margin-top:10px;">
      <b-list-group horizontal="md">
        <b-list-group-item>QUESTIONS</b-list-group-item>
      </b-list-group>
    </div>
    <Answer v-for="answer in filteredList" :key="answer._id" :answer="answer" />
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Answer from "./answer";
import instance from "../myconfig";
export default {
  created() {
    this.$store.dispatch("GET_QUESTION");
  },
  components: {
    "tinymce-editor": Editor, // <- Important part
    Answer
  },
  data() {
    return {
      questionDesc: "",
      title: ""
    };
  },
   computed: {
    filteredList() {
      return this.$store.state.questions.filter(article => {
        return article.title.toLowerCase().includes(this.$store.state.newSearching.toLowerCase());
      });
    }
  },
  methods: {
    question() {
      if (this.$store.state.isLogin == false) {
        Swal.fire({
          title: "OOPS",
          type: "error",
          text: "login first"
        });
      } else {
        instance
          .post(
            "/questions",
            {
              question: this.questionDesc,
              title: this.title
            },
            {
              headers: {
                token: localStorage.getItem("token")
              }
            }
          )
          .then(({ data }) => {
            Swal.fire({
              title: "SUCCESS",
              type: "success",
              text: "Success add questions"
            });
            this.$store.dispatch("GET_QUESTION");
          })
          .catch(err => {
            Swal.fire({
              type: "error",
              text: err.response.data
            });
          });
      }
    }
  },
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
