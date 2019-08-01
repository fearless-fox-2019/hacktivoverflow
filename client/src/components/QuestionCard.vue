<template>
  <div class="question-card d-flex align-items-center">
    <!-- ============ RATING =============== -->
    <div class="rating col-2 d-flex flex-column align-self-stretch justify-content-around">
      <div class="votes">
        <div class="count">{{totalVotes}}</div>
        <span>Votes</span>
      </div>
      <div class="answer">
        <div class="count">{{totalAnswers}}</div>
        <span>Answer</span>
      </div>
    </div>

    <!-- =============== MAIN ================ -->
    <div class="main d-flex flex-column align-items-start col-10">
      <h3>
        <a href @click.prevent="detailPage(id)">{{title}}</a>
      </h3>
      <p class="content">
        {{trimContent}}
        <span v-if="content.length > 150">
          ...
          <a href>See all</a>
        </span>
      </p>
      <!-- ------------------  createor area ----------------------- -->
      <div class="creator d-flex justify-content-between align-self-stretch align-items-center">
        <div class="col-2">
          <div class="options d-flex" v-if="author.email == getLoginEmail">
            <b-button
              v-b-modal.editQuestion
              secondary
              class="options-btn"
              variant="primary"
              @click.prevent="editPage(id)"
            >Edit</b-button>
            <EditQuestionForm :question="getQuestion"></EditQuestionForm>
            <b-button
              class="options-btn"
              variant="danger"
              :question="getQuestion"
              @click.prevent="deleteQuestion(id)"
            >Delete</b-button>
          </div>
        </div>

        <div class="creator-info d-flex col-4 align-items-center">
          <div class="prof-pic col">
            <img src="../assets/portrait.jpg" alt />
          </div>
          <div class="user-desc col">
            <small>asked 1 hours ago</small>
            <p>author: {{author.username}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EditQuestionForm from "@/components/EditQuestionForm.vue";

export default {
  components: {
    EditQuestionForm
  },
  props: [
    "id",
    "title",
    "content",
    "createdAt",
    "author",
    "upVotes",
    "downVotes",
    "answers"
  ],
  computed: {
    ...mapGetters(["getLoginEmail", "getQuestion"]),
    trimContent() {
      return this.content.substr(0, 150);
    },
    totalVotes() {
      return this.upVotes.length - this.downVotes.length;
    },
    totalAnswers() {
      return this.answers.length;
    }
  },
  methods: {
    ...mapActions(["deleteQuestion", "editPage"]),
    detailPage(id) {
      this.$router.push(`/questions/${id}`);
    }
  }
};
</script>

<style scoped>
div.question-card {
  background-color: rgb(236, 231, 231);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.328);
  width: 90%;
  margin-bottom: 30px;
}

h3 {
  font-size: 20px;
}

p {
  text-align: justify;
  font-size: 13px;
}

p.content {
  font-family: "PT Serif";
}

.prof-pic {
  padding: 0;
}

img {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.575);
}

span {
  font-size: 12px;
  font-family: "PT Serif";
}

small {
  font-size: 10px;
}

h3 {
  font-family: "Oswald";
}

.count {
  font-family: "Oswald";
}

div.rating {
  background-color: rgb(198, 202, 202);
  border-radius: 7px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.383);
}

.options-btn {
  margin-right: 10px;
}

div.creator-info {
  background-color: rgb(133, 181, 196);
  border-radius: 7px;
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.383); */
  padding-top: 5px;
  padding-bottom: 5px;
}

.main {
  padding-top: 0;
}
</style>
