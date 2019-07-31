<template>
  <div class="card flex-row mt-4">
        <b-col cols="1" align-self="start" class="mt-3 voteLength">
          <div class="ml-4">
          <a @click.prevent="upVote(comment._id)" :style="upvoted ? 'color: orange;' : 'color: black;'">
                  <i class="fas fa-arrow-up"  >
                  </i>
                </a>
            <br>
              {{comment.upVotes.length - comment.downVotes.length}}
            <br>
           <a @click.prevent="downVote(comment._id)" :style="downvoted ? 'color: orange;' : 'color: black;'">
                  <i class="fas fa-arrow-down"  >
                  </i>
            </a>
          </div>
        </b-col>
        <b-col cols="11">
          <div class="card-body">
            <h4 class="card-title mt-3">
              {{comment.title}}
            </h4>
              <p class="card-text">
                {{comment.content}}
                <!-- {{userId}} -->
              </p>
            <div class="float-right mb-3" v-if="comment.userId == userId">
              <b-button v-b-modal.updateAnswer @click.prevent="getData(comment._id)">
                Update
              </b-button>
                <!-- <updateAnswer :comment="comment" @commentUpdated="getComment"></updateAnswer> -->
            </div>
          </div>

        </b-col>
      <!-- <div class="card-body">

        <h4 class="card-title"> nihaoma</h4> 
      </div> -->
    </div>

  
</template>

<script>
import {mapState} from 'vuex'
import updateAnswer from './updateAnswer'

export default {
  data() {
    return {
      upvoted: false,
      downvoted: false,
      userId:  '',
      count: 0
    }
  },
  components: {
    updateAnswer
  },
  props: ['comment','answerUpdated'],
  methods: {
    getData(id) {
      this.$store.commit('COMMENT_ID',id)
      // this.count++;
    },
    getUpVoteDownVote: function() {
        let id = localStorage.getItem('id')
        let foundUpVote = this.comment.upVotes.filter((userId) => userId == id)
        let foundDownVote = this.comment.downVotes.filter((userId) => userId == id)
        // console.log(foundUpVote, 'ini foundupvote')
        if(foundUpVote.length > 0) {
          // console.log('asd')
          // this.$state.commit('UPVOTED', true)
          this.upvoted = true
        }
        if(foundDownVote.length > 0) {
          // console.log('ini downvote');
          // this.$state.commit('DOWNVOTED', true)
          this.downvoted = true
        }
    },
    getComment(val) {
      this.comment.title = answerUpdated.updateAnswer
      this.comment.content = this.$store.state.commentUpdated.content
    },
      upVote(questionId) {
      // console.log('asd')
      if(localStorage.getItem('token')) {
        console.log('masuk sini ngak?')
        if(this.upvoted == false) {
          // this.$store.commit('UPVOTED', true)
          this.upvoted = true
          let id = localStorage.getItem('id')
          let found = this.comment.upVotes.filter((userId) => userId == id)
          if(found.length == 0) {
            this.comment.upVotes.push(id)
            let index = this.comment.downVotes.findIndex((userId) => userId == id)
            if(index !== -1) {
              this.comment.downVotes.splice(index,1)
            }
            this.$store.dispatch('upVoteAnswer', questionId)
          }
          if(this.downvoted) {
            // this.$store.commit('DOWNVOTED', false)
            // console.log('ini if downovted')
            this.downvoted = false
            // this.$store.dispatch('upVote',questionId)
  
          }
        } else {
          this.upvoted = false
          let id = localStorage.getItem('id')
          let index = this.comment.upVotes.findIndex((userId) => userId == id)
          this.comment.upVotes.splice(index,1)
          this.$store.dispatch('upVoteAnswer',questionId)
        }
      } else {
        this.$swal({
          type: 'error',
          text: 'login to upvote/downvote',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    downVote(questionId) {
      if(localStorage.getItem('token')) {
        if(this.downvoted == false) {
          // this.$store.commit('DOWNVOTED',true)
          this.downvoted = true
          let id = localStorage.getItem('id')
          let found = this.comment.downVotes.filter((userId) => userId == id)
          if(found.length == 0) {
            this.comment.downVotes.push(id)
            let index = this.comment.upVotes.findIndex((userId) => userId == id)
            if(index !== -1) {
              this.comment.upVotes.splice(index,1)
            }
            this.$store.dispatch('downVoteAnswer', questionId)
          }
          // console.log(this.question.upVotes)
          // console.log(found)
          if(this.upvoted) {
            // console.log('ini if $store.state.upvoted')
            this.upvoted = false
            // this.$store.commit('UPVOTED',false)
            // this.$store.dispatch('downVote', questionId)
          }
        } else {
          // this.$store.commit('DOWNVOTED',false)
          this.downvoted = false
          let id = localStorage.getItem('id')
          let index = this.comment.downVotes.findIndex((userId) => userId == id)
          this.comment.downVotes.splice(index,1)
          this.$store.dispatch('downVoteAnswer', questionId)
        }
      } else {
        this.$swal({
          type: 'error',
          text: 'login to upvote/downvote',
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
  },
  created() {
    if(localStorage.getItem('token')) {
      this.userId = localStorage.getItem('id')
    }
    this.getUpVoteDownVote()
    // this.getComments()
  },
  watch: {
    answerUpdated: function() {
     if(this.comment._id == this.answerUpdated._id) {
       this.comment.title = this.answerUpdated.title
       this.comment.content =  this.answerUpdated.content
       // console.log('masuk sini ngak?')
     }
    }
  }
}
</script>

<style>

</style>
