<template>
  <b-card no-body class="overflow-hidden" style="width: 100%;margin-bottom: 15px;">
  <b-container class="bv-example-row">
    <b-row>
      <b-col sm="1">
        <div @click.prevent="upVotes">
          <i class="far fa-arrow-alt-circle-up"></i>
        </div>
        <br />
        <div>
          <p>{{voter}}</p>
          <i
            @click.prevent="downVotes"
            style="margin-top:10px"
            class="far fa-arrow-alt-circle-down"
          ></i>
        </div>
      </b-col>
      <b-col sm="11">
        <div style="text-align: left;" class="d-flex justify-content-start">
          <div v-html="this.answering.answer"></div>
        </div>
        <p class="d-flex justify-content-end">Answer by : {{this.answering.answerer.username}}</p>
        <div class="d-flex justify-content-end">
        <b-button
          size="sm"
          variant="primary"
          class="my-2 my-sm-0"
          v-b-modal="`${this.answering._id}`"
        >
          <b-modal ref="answer" :id="idAnswer" title="answer">
            <form @submit.prevent="updateAnswer">
              <div class="form-group">
                <label>edit your answer here!</label>
                <tinymce-editor
                  v-model="newAnswer"
                  api-key="x3sojlqrnmbc6ad5465jt7utexbpvdvc3tjgamy2547nf38a"
                  :init="{plugins: 'wordcount'}"
                ></tinymce-editor>

                <!-- <textarea ></textarea> -->
              </div>
              <button type="submit" class="btn btn-primary">update answer</button>
            </form>
          </b-modal>Update
        </b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
  </b-card>
</template>

<script>
import instance from "../myconfig";
import Editor from "@tinymce/tinymce-vue";
export default {
  created() {
    console.log(this.$store.state.answers, "saya tanya");
  },
  data() {
    return {
      newAnswer: this.answering.answer,
      idAnswer: this.answering._id
    };
  },
  components: {
    "tinymce-editor": Editor // <- Important part
  },
  props: ["answering"],
  methods: {
    updateAnswer() {
      // console.log(this.newAnswer)
       instance
        .put(
          `/answers/${this.answering._id}`,
          {
            answer : this.newAnswer
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("GET_ANSWERS", this.$route.params.id);
           Swal.fire({
            type: "success",
            text: "success update your answer!"
          });
        })
        .catch(err => {
          // console.log
          Swal.fire({
            type: "error",
            text: "not authorize"
          });
        });

    },
    upVotes() {
      console.log("up");
      instance
        .post(
          `/answers/upvote/${this.answering._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("GET_ANSWERS", this.$route.params.id);
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
          `/answers/downvote/${this.answering._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("GET_ANSWERS", this.$route.params.id);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: err.response.data
          });
        });
    }
  },
  computed: {
    // a computed getter
    voter: function() {
      // `this` points to the vm instance
      return this.answering.upVotes.length - this.answering.downVotes.length;
    }
  }
};
</script>

<style>
</style>
