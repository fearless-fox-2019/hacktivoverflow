<template>
    <div style="width: 100%">

        <div id="answer-container">
            <div id="vote-box"  class="media-left" style="width: 50px">
                <p @click.prevent="$store.dispatch('upvoteAnswer', answer._id)">
                    <i v-if="statusvote === 'down' || statusvote === ''" class="fas fa-caret-up" id="arrow"></i>
                    <i v-if="statusvote === 'up'" class="fas fa-caret-up" id="arrowOk"></i>
                <p id="totalVote">
                    {{answer.upvotes.length-answer.downvotes.length}}
                </p>
                <p @click.prevent="$store.dispatch('downvoteAnswer', answer._id)">
                    <i v-if="statusvote === 'up' || statusvote === ''" class="fas fa-caret-down" id="arrow"></i>
                    <i v-if="statusvote === 'down'" class="fas fa-caret-down" id="arrowOk"></i>
                </p>
            </div>

            <div class="media-content" >
                <div class="content">
                    <p><strong>{{answer.title}}</strong> </p>
                    <article id="content-txt" v-html="answer.description" class="media"></article>
                    <div id="footer">
                        <p><small>Answered by: {{answer.userId.name}} · {{time}}</small></p>
                        <div v-if="loggedUser == answer.userId._id" style="width: 80px; display: flex; justify-content: space-around">
                            <a @click="toEditAnswer"><i class="fas fa-edit"></i></a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="edit" class="media-content" id="form-box">
            <form style="width: 900px; margin-left: 8%; padding-bottom: 40px; margin-top: 10px">
                <div class="field">
                    <p class="control">
                        <b-field  class="has-text-left" label="Title :">
                            <b-input v-model="answer.title"></b-input>
                        </b-field>
                        <b-field  class="has-text-left" label="Description :"></b-field>
                        <wysiwyg v-model="answer.description" />
                    </p>
                    </div>

                    <div class="control is-pulled-right" id="form-btn">
                        <b-button @click="updateAnswer" class="is-small" type="is-info">Post Your Answer</b-button>
                        <b-button @click="cancel" class="is-small" type="is-info">Cancel</b-button>
                    </div>

            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'part-answer',
  props: ['answer'],
  data () {
    return {
      statusvote: '',
      edit: false

    }
  },
  methods: {
    ...mapActions(['updateAnswer']),

    toEditAnswer () {
      this.edit = true
    },
    cancel () {
      this.edit = false
    },
    updateAnswer () {
      this.edit = false
      this.updateAnswer(this.answer)
    },
    checkUpvote () {
      if (this.answer.upvotes.includes(this.loggedUser)) {
        this.statusvote = 'up'
      }
    },

    checkDownvote () {
      if (this.answer.downvotes.includes(this.loggedUser)) {
        this.statusvote = 'down'
      }
    }

  },
  computed: {
    loggedUser () {
      return localStorage.userId
    },
    upvotesAnswer () {
      return this.answer.upvotes
    },
    downvotesAnswer () {
      return this.answer.downvotes
    },
    time () {
      return moment(this.answer.createdAt).fromNow()
    }

  },
  watch: {
    upvotesAnswer (val) {
      this.checkUpvote()
    },
    downvotesAnswer (val) {
      this.checkDownvote()
    }
  }
}
</script>

<style scoped>
    #answer-container{
        display: flex;
        justify-content: space-between;

    }
    #form-btn{
        width: 200px;
        display: flex;
        justify-content: space-around;
        padding-bottom: 20px
    }
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
    #form-box{
        border: 2px solid black;
        border-radius: 25px 20px
    }
</style>
