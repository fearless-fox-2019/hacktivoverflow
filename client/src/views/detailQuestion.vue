<template>
  <div class="question">
    <div class="columns">
      <div class="column is-2">1</div>
      <div class="column mainquestion">
        <div class="questioncard">
          <div class="top">
            <h1>{{detailQuestion.title}}</h1>
            <p>{{detailQuestion.solved}}</p>
          </div>
          <!-- <hr /> -->
          <div class="columns bottom">
            <div class="column botleft is-2" v-if="$store.state.logedUser">
              <div class="upvote" @click="upvote(detailQuestion._id)"><i class="fas fa-chevron-up"></i></div>
              <div class="totalvote">{{detailQuestion.upVote.length - detailQuestion.downVote.length}}</div>
              <div class="downvote" @click="downvote((detailQuestion._id))"><i class="fas fa-chevron-down"></i></div>
            </div>
            <div class="column botright">
              <div class="botright1" v-show="!isEdit">
                <h2>{{detailQuestion.content}}</h2>
                <p class="created">{{created}}</p>
                <div class="tags">
                  <div
                    class="tag is-info"
                    v-for="(tag,i) in detailQuestion.tags"
                    :key="i"
                    @click="tagSearch(tag)"
                  >{{tag}}</div>
                </div>
              </div>
              <div class="botright3" v-show="isEdit">
                <form @submit.prevent="editquestion(detailQuestion._id)">
                  <b-field label="Title">
                    <b-input v-model="edittitle"></b-input>
                  </b-field>
                  <b-field label="Content">
                    <b-input v-model="editcontent" minlength="40" type="textarea"></b-input>
                  </b-field>
                  <b-field label="Tags">
                    <b-input v-model="edittag"  placeholder="separate by coma (',')"></b-input>
                  </b-field>
                  <input type="submit" class="hidden-button">
                  <b-button type="is-info" @click="editquestion(detailQuestion._id)">Edit</b-button>
                </form>
              </div>
              <div class="botright2" v-if="$store.state.logedUser._id === detailQuestion.userId._id">
                <a @click="showform">
                  <i class="far fa-edit"></i>
                </a>
                <a @click="deletequestion(detailQuestion._id)">
                  <i class="far fa-trash-alt"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="answers">
          <div class="answer">
            <answer v-for="(answer,i) in answers" :key="i" :answer="answer" />
          </div>
          <div class="answerbox">
            <form>
              <b-field label="Post an Answer">
                <b-input v-model="answerdata" maxlength="200" type="textarea"></b-input>
              </b-field>
              <b-button @click="postAnswer">Submit</b-button>
            </form>
          </div>
        </div>
      </div>
      <div class="column is-3">3</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import answer from "@/components/answer.vue";

export default {
  components: {
    answer
  },
  data() {
    return {
      isEdit: false,
      // edittitle: this.$store.state.detailQuestion.title,
      // editcontent: this.$store.state.detailQuestion.content,
      // edittag: this.$store.state.detailQuestion.tags.join(','),
      edittitle: "",
      editcontent: "",
      edittag: "",
      answerdata: ""
    };
  },
  methods: {
    tagSearch(tag) {
      console.log("ini tag yang dicari", tag);
      this.$router.push("/search/tag?tag=" + tag);
    },
    postAnswer() {
      this.$store.dispatch("postAnswer", {
        body: this.answerdata,
        questionId: this.$route.params.questionId
      });
      this.answerdata = "";
    },
    showform() {
      if (this.isEdit) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
      }
    },
    editquestion(questionid) {
      console.log("mengedit question dengan id ", {
        questionId: questionid,
        title: this.edittitle,
        content: this.editcontent,
        tags: this.edittag
      });
      this.$store.dispatch('editquestion',{
        questionId: questionid,
        title: this.edittitle,
        content: this.editcontent,
        tags: this.edittag
      })
      this.isEdit = false
    },
    deletequestion(questionid) {
      console.log("menghapus question dengan id ", questionid);
      this.$store.dispatch("deletequestion", questionid);
    },
    upvote(id){
      console.log('upveote',id)
      this.$store.dispatch('voteQuestion',{
        vote: 'up',
        questionId: id
      })
    },
    downvote(id){
      console.log('downvote',id)
      this.$store.dispatch('voteQuestion',{
        vote: 'down',
        questionId: id
      })
    }
  },
  computed: {
    ...mapState(["detailQuestion"]),
    created() {
      return moment(this.detailQuestion.createdAt)
        .startOf("day")
        .fromNow();
    },
    answers() {
      return this.detailQuestion.answers;
    }
  },
  mounted() {
    // console.log(this.$route.params.questionId, 'ini idnya')
    this.$store.dispatch('whoami')
    this.$store.dispatch("getQuestion", this.$route.params.questionId);
  }
  // watch: {
  //   'this.$route.params.questionId'(){
  //   this.$store.dispatch('whoami')
  //   this.$store.dispatch("getQuestion", this.$route.params.questionId);

  //   }
  // }
};
</script>

<style scoped>
/* .column {
  border: 1px solid sandybrown;
} */
.questioncard {
  /* border: 1px solid orchid; */
  padding: 20px;
}
.hidden-button {
  width: 0px;
  height: 0px;
  padding: 0px;
  border: 0px;
  visibility: hidden;
}
.top {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 20px;
  min-height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.bottom {
  display: flex;
  align-content: flex-start;
  text-align: left;
}
.botleft {
  display: flex;
  flex-shrink: 1;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: column;
}
.botright {
  padding-left: 15px;
  display: flex;
  justify-content: space-between;
}
.botright2 {
  display: flex;
  flex-direction: column;
  margin: 5px;
}
.botright3{
  margin: 0px auto;
  width: 350px;
}
.created {
  font-size: 12px;
  margin-bottom: 15px;
}
.answerbox {
  border: 1px solid black;
}
.textarea {
  width: 100px !important;
}
.tag {
  cursor: pointer;
}
i {
  margin: 5px;
  font-size: 18px;
  cursor: pointer;
}
</style>
