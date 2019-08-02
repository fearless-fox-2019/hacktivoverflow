<template>
    <div class="container" style="margin-top: 7%;">

        <article class="media" v-if="currentQuestion.upvotes">
            <!-- Question section -->
            <div id="vote-box" class="media-left" style="width: 50px">
                <p @click.prevent="$store.dispatch('upvoteQuestion', currentQuestion._id)">
                    <i v-if="statusvote === 'down' || statusvote === ''" class="fas fa-caret-up" id="arrow"></i>
                    <i v-if="statusvote === 'up'" class="fas fa-caret-up" id="arrowOk"></i>
                </p>
                <p id="totalVote">
                    {{currentQuestion.upvotes.length-currentQuestion.downvotes.length}}
                </p>
                <p @click.prevent="$store.dispatch('downvoteQuestion', currentQuestion._id)">
                    <i v-if="statusvote === 'up' || statusvote === ''" class="fas fa-caret-down" id="arrow"></i>
                    <i v-if="statusvote === 'down'" class="fas fa-caret-down" id="arrowOk"></i>
                </p>
            </div>
            <div class="media-content">
                <div class="content">
                    <p> <strong>{{currentQuestion.title}}</strong>  </p>

                    <article v-html="currentQuestion.description" class="media"></article>
                    <br>
                    <div class="tags">
                        <span v-for="(tag, index) in currentQuestion.tags"
                            :key="index"
                            @click.prevent="searchTag(tag)"
                            class="tag is-info">
                            <a style="color: white">{{tag}}</a>
                        </span>
                    </div>

                    <div id="footer" style="margin-top: -10px">
                        <p><small>Asked by: {{currentQuestion.userId.name}} · {{questionTime}}</small></p>
                        <div v-if="loggedUser == currentQuestion.userId._id" style="width: 80px; display: flex; justify-content: space-around">
                            <a @click="toEditQuestion"><i class="fas fa-edit"></i></a>
                            <a @click="removeQuestion"><i class="fas fa-trash"></i></a>
                        </div>
                    </div>
                </div>

                <formQuestion
                    v-if="edit === 'question'"
                    :question="currentQuestion"
                    @gotData="saveQuestion"
                ></formQuestion>

                <!-- Answer Section -->
                <article v-for="answer in currentQuestion.answers" :key="answer._id"  class="media" style="margin-top: -10px">
                    <partAnswer :answer="answer"></partAnswer>

                </article>
            </div>
        </article>
        <!-- Post answer Section -->
        <article  class="media">
            <div class="media-left">
                <p class="title is-5">Your Answer:</p>
            </div>
            <div class="media-content">
                <div class="field">
                <p class="control">
                    <b-field  class="has-text-left" label="Title :">
                        <b-input v-model="newAnswer.title"></b-input>
                    </b-field>
                    <b-field  class="has-text-left" label="Description :"></b-field>
                    <wysiwyg v-model="newAnswer.description" />
                </p>
                </div>
                <div class="field">
                <p class="control">
                    <b-button @click="submitAnswer" type="is-info">Post Your Answer</b-button>
                </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import formQuestion from '@/components/formQuestion.vue'
import partAnswer from '@/components/partAnswer.vue'

export default {
  name: 'detailQuestion',
  components: {
    formQuestion,
    partAnswer

  },
  data () {
    return {
      edit: '',
      statusvote: '',
      loggedUser: '',
      newAnswer: {
        title: '',
        description: ''
      }
    }
  },

  methods: {
    ...mapActions(['getAllQuestion', 'getCurrentQuestion', 'createAnswer', 'deleteQuestion', 'updateQuestion']),

    checkUpvote () {
      if (this.currentQuestion.upvotes.includes(this.loggedUser)) {
        this.statusvote = 'up'
      }
    },

    checkDownvote () {
      if (this.currentQuestion.downvotes.includes(this.loggedUser)) {
        this.statusvote = 'down'
      }
    },

    searchTag (tag) {
      console.log('ketrigger', tag)
      this.$router.push('/home')
      this.getAllQuestion('/questions?tag=' + tag)
    },

    submitAnswer () {
      let data = {
        title: this.newAnswer.title,
        description: this.newAnswer.description,
        questionId: this.currentQuestion._id
      }

      this.createAnswer(data)
      this.newAnswer.title = ''
      this.newAnswer.description = ''
    },
    toEditQuestion () {
      this.edit = 'question'
    },
    toEditAnswer () {
      this.edit = 'answer'
    },
    saveQuestion (data) {
      this.edit = '',
      this.updateQuestion(data)
    },
    saveAnswer (data) {
      this.edit = ''
      console.log(data)
    },
    close () {
      this.edit = ''
    },
    removeQuestion () {
      Swal.fire({
        text: 'Are you sure delete this question?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sure!'
      }).then((result) => {
        if (result.value) {
          this.deleteQuestion(this.currentQuestion._id)
        }
      })
    }
  },
  computed: {
    ...mapState(['currentQuestion']),

    upvotes () {
      return this.currentQuestion.upvotes
    },
    downvotes () {
      return this.currentQuestion.downvotes
    },
    questionTime () {
      return moment(this.currentQuestion.createdAt).fromNow()
    }
  },
  created () {
    this.getCurrentQuestion()
    this.loggedUser = localStorage.userId
  },
  watch: {
    upvotes (val) {
      this.checkUpvote()
    },
    downvotes (val) {
      this.checkDownvote()
    }
  }
}
</script>

<style scoped>
    #vote-box{
        display: flex;
        flex-direction: column;
        text-align: center
    }
    #arrow{
        font-size: 30px
    }
    #arrowOk{
        font-size: 30px;
        color: red
    }
    #totalVote{
        font-size: 24px;
    }
    #footer{
        display: flex;
        justify-content:space-between;
    }
    #content-text{
        margin-bottom: 5px
    }
</style>
