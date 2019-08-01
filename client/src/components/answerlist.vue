<template>
  <div class="text-left pt-4 answer">
    <a-list
    class="comment-list"
    :header="`${answers.length} replies`"
    itemLayout="horizontal"
  >
    <a-comment v-for="answer in answers" :key="answer._id">
    <template slot="actions">
      <span>
        <a-tooltip title="Like">
          <a-icon
            type="like"
            :theme="action === 'liked' ? 'filled' : 'outlined'"
            @click="upvote(answer)"
          />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{answer.upvotes.length}}
        </span>
      </span>
      <span>
        <a-tooltip title="Dislike">
          <a-icon
            type="dislike"
            :theme="action === 'disliked' ? 'filled' : 'outlined'"
             @click="downvote(answer)"
          />
        </a-tooltip>
        <span style="padding-left: '8px';cursor: 'auto'">
          {{answer.downvotes.length}}
        </span>
      </span>
      <span v-if="checkAuth(answer)" @click="showModal(answer)">Edit</span>
      <a-popconfirm title="Are you sure delete this task?" @confirm="deleteAnswer(answer)" okText="Yes" cancelText="No">
    <span v-if="checkAuth(answer)">Delete</span>
  </a-popconfirm>
    </template>
    <a slot="author">{{answer.user_id.username}}</a>
    <a-avatar
      src="https://s3.amazonaws.com/wgvs-inbound-prod/avatars/default/avatar5.png"
      :alt="answer.user_id.username"
      slot="avatar"
    />
        <p slot="content" v-html="answer.description"></p>
    <a-tooltip slot="datetime" :title="moment().format('YYYY-MM-DD HH:mm:ss')">
      <span>{{moment(answer.createdAt).fromNow()}}</span>
    </a-tooltip>
  </a-comment>
    </a-list>
   
    <b-modal ref="myn-modal" hide-footer title="Edit Answer">
      <div class="d-block text-left">
        <form @submit.prevent="editAnswer" id="editform">
          <wysiwyg v-model="desc" />
          <b-button class="mt-3 mr-2" type="submit" variant="outline-primary">Save</b-button>
          <b-button class="mt-3" variant="outline-primary" @click="hideModal">Close Me</b-button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ax from "@/axiosApi";
import moment from 'moment'

export default {
  name: "answerList",
  computed: {
    ...mapState(["answers","isUser"])
  },
  data() {
    return {
      error: "",
      desc: "",
      tempAnswer:'',
       action: null, moment
    };
  },
  mounted() {
    this.$store.dispatch("GETANSWER", this.$route.params.questionId);
  },
  methods: {
    checkAuth(data) {
      if (this.isUser == data.user_id._id) {
        return true;
      } else {
        return false;
      }
    },
    showModal(answer) {
      this.desc = answer.description;
      this.tempAnswer = answer
      this.$refs["myn-modal"].show();
    },
    hideModal() {
      this.$refs["myn-modal"].hide();
    },
    editAnswer() {      
      let dataQ = {
        id: this.tempAnswer._id,
        qId: this.tempAnswer.question_id,
        desc: this.desc
      };
      this.$store.dispatch("EDITANSWER", dataQ);
      this.$refs["myn-modal"].hide();
    },
    deleteAnswer(answer) {      
      let dataQ = {
        id: answer._id,
        qId: answer.question_id,
      };
      this.$store.dispatch("DELETEANSWER", dataQ)
      .then(()=>{
        this.$message.success('successfully deleted')
      })
      .catch(err =>{
        this.$message.error(err.response.data.message)
      })

    },
    upvote(answer) {
      console.log(answer);

      ax.patch(
        `answers/upvote/${answer._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch("GETANSWER", this.$route.params.questionId);
          this.action = 'liked'

        })
        .catch(err => {
          this.error = err;
          console.log(err);
        });
    },
    downvote(answer) {
      ax.patch(
        `answers/downvote/${answer._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          this.$store.dispatch("GETANSWER", this.$route.params.questionId);
          this.action = 'disliked'
          console.log(data);
        })
        .catch(err => {
          this.error = err.message;
          console.log(err);
        });
    }
  }
};
</script>

<style>
.comment {
  text-align: left;
}
.answer{
  width: 50rem;
}
#editform{
  padding-bottom: 0;
}
</style>
