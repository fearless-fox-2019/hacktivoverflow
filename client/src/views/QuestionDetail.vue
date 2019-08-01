<template>
  <div class="home my-containter container row">
    <div class="col-sm-4 d-flex justify-content-end">
      <Sidebar />
    </div>
    <div class="col-sm-8">
      <div
        class="col"
        style="padding-top: 40px; padding-left: 20px; padding-right: 20px; padding-bottom: 5px; background-color: #fff; margin-bottom: 50px"
      >
        <div>
          <div id="question" style="display: flex;">
            <div class="mr-5 d-flex flex-column">
              <div class="vote" @click="upvoteQuestion" style="font-size: 1.5rem">
                <i
                  class="fas fa-chevron-up color-orangered"
                  v-if="question.upvote && question.upvote.includes(loginUserId)"
                ></i>
                <i v-else class="fas fa-chevron-up"></i>
              </div>
              <div class="text-center" style="font-size: 1.5rem">{{totalVote}}</div>
              <div class="vote" @click="downvoteQuestion" style="font-size: 1.5rem">
                <i
                  class="fas fa-chevron-down color-orangered"
                  v-if="question.downvote && question.downvote.includes(loginUserId)"
                ></i>
                <i v-else class="fas fa-chevron-down"></i>
              </div>
            </div>

            <div style="width: 100%;">
              <div>
                <h4 style="text-align: left">{{question.title}}</h4>
                <hr style="margin: 0; margin-bottom: 20px"/>
              </div>
              <div>
                <p style="text-align: justify">{{question.description}}</p>
              </div>

              <ul class="tags">
                <li :key="index" v-for="(tag, index) in question.tags"># {{tag.toLowerCase()}}</li>
              </ul>
              <div class="created-by__container">
                <div class="created-by">
                  <div style="text-align: right">
                    <i class="far fa-user"></i>
                    {{question.UserId.username}}
                  </div>
                  <div>
                    <div class="author d-flex justify-content-end"><div style="padding-right: 5px">asked: </div><i>{{question.createdAt | moment("MMMM Do YY")}}</i></div>
                    <!-- <small>{{question.createdAt | moment("dddd, MMMM Do")}}</small> -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="all-answer d-flex">
            <hr style="margin-bottom: 10px"/>
            <div class="d-flex flex-row justify-content-between">
              <AnswerForm :question-id="question.UserId._id" :login-user-id="loginUserId" />
              <div class="d-flex align-items-center"><h5 style="margin: 0">{{answers.length}} Answer</h5></div>
            </div>
            <hr style="margin-top: 10px"/>
            <div
              :key="index"
              v-for="(answer,index) in answers"
              style="display: flex; width: 740px;"
            >
              <div class="mr-5">
                <div class="vote" @click="upvoteAnswer(answer._id)">
                  <i
                    class="fas fa-chevron-up color-orangered"
                    v-if="answer.upvote.includes(loginUserId)"
                  ></i>
                  <i class="fas fa-chevron-up" v-else></i>
                </div>
                <div class="text-center">{{answer.upvote.length - answer.downvote.length}}</div>
                <div class="vote" @click="downvoteAnswer(answer._id)">
                  <i
                    class="fas fa-chevron-down color-orangered"
                    v-if="answer.downvote.includes(loginUserId)"
                  ></i>
                  <i class="fas fa-chevron-down" v-else></i>
                </div>
              </div>
              <div style="width: 82%;" class="mb-3">
                <div class="mb-5" style="display: flex; justify-content: space-between;">
                  <div v-html="answer.description"></div>
                  <button
                    v-if="!showEdit && answer.UserId._id === loginUserId"
                    class="btn btn-link"
                    @click="showEditTextArea(answer._id)"
                  >Edit</button>
                  <button
                    v-if="showEdit && answer.UserId._id === loginUserId"
                    class="btn btn-link"
                    @click="showEditTextArea(answer._id)"
                  >Cancel</button>
                </div>
                <div class="created-by__container">
                  <div class="created-by">
                    <div style="text-align: right">
                      <i class="far fa-user"></i>
                      {{answer.UserId.username}}
                    </div>
                    <div>
                      <div class="author d-flex justify-content-end"><div style="padding-right: 5px">answered: </div><i>{{question.createdAt | moment("MMMM Do YY")}}</i></div>
                      <!-- <small>{{answer.createdAt | moment("dddd, MMMM Do")}}</small> -->
                    </div>
                  </div>
                </div>
                <div v-if="showEdit && editAnswerActiveForm === answer._id">
                  <h6>Edit Answer</h6>
                  <form @submit.prevent="submitEditAnswer(answer._id)">
                    <textarea
                      v-model="editAnswer"
                      cols="10"
                      class="form-control mb-3"
                      rows="5"
                      style="overflow:auto;
                            resize:none"
                    ></textarea>
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
                
                <div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
          <!-- <AnswerForm :question-id="question.UserId._id" :login-user-id="loginUserId" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myaxios from "@/apis/localhost";
import Sidebar from "@/components/Sidebar.vue";
import AnswerForm from "@/components/AnswerForm.vue";

export default {
  components: {
    AnswerForm,
    Sidebar
  },
  data() {
    return {
      question: [],
      username: '',
      editAnswer: '',
      showEdit: false,
      editAnswerActiveForm: ''
    };
  },
  methods: {
    getQuestion() {
      myaxios
        .get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    fetchAnswer() {
      myaxios
        .get(`/answers/${this.$route.params.id}`)
        .then(({ data }) => {
          this.$store.commit('SET_ANSWERS', data);
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    upvoteQuestion() {
      if (localStorage.token) {
        myaxios.defaults.headers.common.token = localStorage.token;

        myaxios
          .patch(`questions/vote/${this.question._id}/upvote`)
          .then(({ data }) => {
            this.question = data;
            this.$store.commit('EDIT_QUESTIONS', data);
            this.$store.commit('EDIT_MY_QUESTIONS', data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push('/login');
      }
    },
    downvoteQuestion() {
      if (localStorage.token) {
        myaxios.defaults.headers.common.token = localStorage.token;

        myaxios
          .patch(`questions/vote/${this.question._id}/downvote`)
          .then(({ data }) => {
            this.question = data;
            this.$store.commit('EDIT_QUESTIONS', data);
            this.$store.commit('EDIT_MY_QUESTIONS', data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push('/login');
      }
    },
    upvoteAnswer(id) {
      if (localStorage.token) {
        myaxios.defaults.headers.common.token = localStorage.token;

        myaxios
          .patch(`answers/vote/${id}/upvote`)
          .then(({ data }) => {
            this.$store.commit('EDIT_ANSWERS', data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push('/login');
      }
    },
    downvoteAnswer(id) {
      if (localStorage.token) {
        myaxios.defaults.headers.common.token = localStorage.token;

        myaxios
          .patch(`answers/vote/${id}/downvote`)
          .then(({ data }) => {
            this.$store.commit('EDIT_ANSWERS', data);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.push('/login');
      }
    },
    showEditTextArea(answerId) {
      if (answerId === this.editAnswerActiveForm) {
        this.showEdit = !this.showEdit;
      } else {
        this.editAnswerActiveForm = answerId;
        this.showEdit = true;
      }
    },
    submitEditAnswer(answerId) {
      myaxios.defaults.headers.common.token = localStorage.token;

      myaxios
        .patch(`answers/${answerId}`, { description: this.editAnswer })
        .then(({ data }) => {
          this.$store.commit('EDIT_ANSWERS', data);
          this.$alertify.success('Answer edited');
          this.showEdit = false;
          this.editAnswer = '';
        })
        .catch(() => {
          this.$alertify.error(
            'Failed, please check your internet connection or try again'
          );
        });
    },
    submitAnswer(payload) {
      this.$store.commit('ADD_ANSWERS', payload);
    }
  },
  created() {
    this.getQuestion();
    this.fetchAnswer();
  },
  computed: {
    loginUserId() {
      return this.$store.getters.loginUserId;
    },
    totalVote() {
      let upvote = this.question.upvote ? this.question.upvote.length : 0;
      let downvote = this.question.downvote ? this.question.downvote.length : 0;

      return upvote - downvote;
    },
    questionAuthor() {
      return this.question.UserId.username;
    },
    answers() {
      return this.$store.getters.answers;
    }
  },
  watch: {
    loginUserId() {
      return this.$store.getters.loginUserId;
    }
  }
};
</script>

<style scoped>
.tag {
  background-color: #616161;
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px;
  padding: 2px 12px;
  margin-right: 8px;
  font-size: 13px;
  padding: 2px 8px;
}
.tag:hover {
  /* cursor: pointer; */
  background-color: #4b4b4b;
}
.tags li:not(:first-child) {
  margin-left: 7px;
}
.created-by__container {
  text-align: right;
}
.created-by {
  display: inline-block;
  background-color: #ccdef9;
  padding: 6px 14px;
  border-radius: 5px;
}
.created-by > div {
  font-size: 16px;
}
.vote:hover {
  cursor: pointer;
}
.color-orangered {
  color: #ff7008;
}
</style>