<template>
  <div class="home">
    <SidebarMenu style="top:65px; height:92vh;" :menu="menu" />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="container-grid">
      <b-container class="bv-example-row" style="margin-left:207px">
        <b-row>
          <b-col cols="7">
            <b-card no-body class="overflow-hidden" style="width: 100%;">
              <div class="d-flex justify-content-start" style>
                <h3>{{this.$store.state.questionOne.title}}</h3>
              </div>
              <div class="d-flex justify-content-start">
                <p>Asked : {{ getAgo(this.$store.state.questionOne.updatedAt) }}</p>
              </div>
              <b-container class="bv-example-row">
                <b-row>
                  <b-col sm="1">
                    <div @click.prevent="upVotes">
                      <i class="far fa-arrow-alt-circle-up"></i>
                    </div>
                    <br />
                    <div>
                      <p>{{voter}}</p>
                      <div @click.prevent="downVotes">
                        <i style="margin-top:10px" class="far fa-arrow-alt-circle-down"></i>
                      </div>
                    </div>
                  </b-col>
                  <b-col sm="11">
                    <div style="text-align: left;" class="d-flex justify-content-start">
                      <div v-html="this.$store.state.questionOne.question"></div>
                    </div>
                  </b-col>
                </b-row>
                <div class="d-flex justify-content-end">
                  <b-button size="sm" variant="primary" class="my-2 my-sm-0" v-b-modal.question>
                    <b-modal ref="question" id="question" title="question">
                      <form @submit.prevent="updateQuestion">
                        <div class="form-group">
                          <label for="formGroupExampleInput">Enter Your Title Question</label>
                          <input
                            type="text"
                            v-model="newTitle"
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
                            v-model="newQuestion"
                            api-key="x3sojlqrnmbc6ad5465jt7utexbpvdvc3tjgamy2547nf38a"
                            :init="{plugins: 'wordcount'}"
                          ></tinymce-editor>

                          <!-- <textarea ></textarea> -->
                        </div>
                        <button type="submit" class="btn btn-primary">update question</button>
                      </form>
                    </b-modal>Update
                  </b-button>
                  <b-button
                    size="sm"
                    @click.prevent="deleteQuestion"
                    variant="danger"
                    class="my-2 my-sm-0"
                  >Delete</b-button>
                </div>
              </b-container>
            </b-card>
            <br />
            <div class="d-flex justify-content-start">
              <h4>{{this.$store.state.answers.length}} answers</h4>
            </div>
            <br />

            <Answering
              v-for="answering in this.$store.state.answers"
              :key="answering._id"
              :answering="answering"
            />

            <br />
            <div class="d-flex justify-content-start">
              <h5>Your Answer</h5>
            </div>
            <br />
            <b-container class="bv-example-row">
              <b-row>
                <form v-on:submit.prevent="answerings">
                  <div class="form-group">
                    <tinymce-editor
                      v-model="answerQuestion"
                      api-key="x3sojlqrnmbc6ad5465jt7utexbpvdvc3tjgamy2547nf38a"
                      :init="{plugins: 'wordcount'}"
                    ></tinymce-editor>

                    <!-- <textarea ></textarea> -->
                  </div>
                  <button type="submit" class="btn btn-primary">submit question</button>
                </form>
              </b-row>
            </b-container>
            <!-- <div class="d-flex flex-column align-items-start">
              <div>
                <i class="far fa-arrow-alt-circle-up"></i>
              </div>
                <br>
                <p>0</p>
                <br>
              <div>
                <i class="far fa-arrow-alt-circle-down"></i>
              </div>
            </div>-->
          </b-col>
          <b-col>
            <b-card-group deck style="width:200px;">
              <b-card
                :title="$store.state.quotes.by"
                :img-src="$store.state.quotes.pic"
                img-alt="Image"
                img-top
              >
                <b-card-text>{{$store.state.quotes.quote}}</b-card-text>
                <div slot="footer">
                  <small class="text-muted">quotes of the seconds</small>
                </div>
              </b-card>
            </b-card-group>
            <!-- <Home msg="Welcome to Your Vue.js App" /> -->
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Answering from "../components/Answering.vue";
import Editor from "@tinymce/tinymce-vue";
import Home from "@/components/Home.vue";
import Sidebar from "@/components/Sidebar.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import instance from "../myconfig";
import moment from 'moment'
export default {
  created() {
    console.log(this.$route.params.id);
    this.$store.dispatch("GET_QUESTION_ONE", this.$route.params.id);
    this.$store.dispatch("GET_ANSWERS", this.$route.params.id);
    instance
      .get(`/questions/${this.$route.params.id}`, {})
      .then(({ data }) => {
        // console.log(data, "disini");
        // context.questions = data;
        this.questionData = data;
        this.newTitle = data.title;
        this.newQuestion = data.question;
        console.log(this.questionData, "=================");
        // console.log(context.questions);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  name: "home",
  components: {
    Home,
    Sidebar,
    SidebarMenu,
    Answering,
    "tinymce-editor": Editor // <- Important part
  },
  methods: {
    getAgo(date){
          console.log(this.username)
            return moment(date).fromNow();
      },
    deleteQuestion() {
      instance
        .delete(`/questions/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          // console.log;
          this.$store.dispatch("GET_QUESTION");
          this.$router.push("/");
          Swal.fire({
            type: "success",
            text: `success delete`
          });
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data
          });
        });
    },
    upVotes() {
      console.log("up");
      instance
        .post(
          `/questions/upvote/${this.$route.params.id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log;
          this.$store.dispatch("GET_QUESTION_ONE", this.$route.params.id);
          console.log(this.voting, "sebelum");
          this.voting =
            this.$store.state.questionOne.upVotes.length -
            this.$store.state.questionOne.downVotes.length;
          console.log(this.voting, "sesudah");
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data
          });
        });
    },
    downVotes() {
      console.log("down");
      instance
        .post(
          `/questions/downvote/${this.$route.params.id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log;
          this.$store.dispatch("GET_QUESTION_ONE", this.$route.params.id);
          this.voting =
            this.$store.state.questionOne.upVotes.length -
            this.$store.state.questionOne.downVotes.length;
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data
          });
        });
    },
    updateQuestion() {
      instance
        .put(
          `/questions/${this.$route.params.id}`,
          {
            title: this.newTitle,
            question: this.newQuestion
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          console.log;
          this.$store.dispatch("GET_QUESTION_ONE", this.$route.params.id);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data
          });
        });
    },
    answerings() {
      console.log(this.answerQuestion);
      if (this.$store.state.isLogin == false) {
        Swal.fire({
          title: "OOPS",
          type: "error",
          text: "login first"
        });
      } else {
        instance
          .post(
            `/answers/${this.$route.params.id}`,
            {
              answer: this.answerQuestion
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
              text: "Success add answer"
            });
            this.$store.dispatch("GET_ANSWERS", this.$route.params.id);
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
  data() {
    return {
      menu: [
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        }
      ],
      answerQuestion: "",
      voting: "",
      questionData: "",
      newTitle: ``,
      newQuestion: ``
    };
  },
  computed: {
    // a computed getter
    voter: function() {
      // `this` points to the vm instance
      return (
        this.$store.state.questionOne.upVotes.length -
        this.$store.state.questionOne.downVotes.length
      );
    }
  }
};
</script>
<style scoped>
.container-grid {
  margin-left: 150px;
}
.v-sidebar-menu .collapse-btn {
  background-color: white;
}
.justify-content-start {
  margin-left: 15px;
}
</style>

