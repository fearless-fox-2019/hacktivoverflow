<template>
<div >
  <div class="card flex-row mt-2" >
    <b-col cols="1" align-self="start" class="mt-3 ml-3 voteLength">
      <a @click.prevent="upVote(question._id)" :style="question.upVotes.includes(userId) && $store.state.isLogin && upvoted ? 'color: orange;' : 'color: black;'">
        <i class="fas fa-arrow-up"  >
        </i>
      </a>
      <!-- {{question.upVotes.includes(id)}} -->
      <br>
      {{question.upVotes.length - question.downVotes.length}}
      <br>
      <a @click.prevent="downVote(question._id)" :style="question.downVotes.includes(userId) && $store.state.isLogin &&  downvoted ? 'color: orange;' : 'color: black;'">
        <i class="fas fa-arrow-down"  >
        </i>
      </a>
    </b-col>
    <b-col cols="11">
      <div class="card-body">
        <!-- Title -->
        <router-link :to="`/post/${question._id}`">
          <h4 class="card-title"> {{question.title}}</h4>
        </router-link>
        <!-- Text -->
        <p class="card-text"> {{question.content}}</p>
        <p class="card-text">Created by: {{question.userId.username}}</p>
        <p class="card-text">
          {{timestamp}}
          </p>

          
        <!-- {{getUSerId}} -->
        <!-- Button -->
        <span class="count-icon">
            <i class="fa fa-comments" aria-hidden="true"></i> 
          <span class="count">  </span>
        </span>
        <div class="float-right">
          
        </div>
      </div>
    </b-col>
  </div>
</div>
  
</template>

<script>
import  {mapState} from 'vuex'
import moment from 'moment'
export default {
  data() {
    return {
      upvoted: false,
      downvoted: false,
      count: this.$store.state.count,
      id: localStorage.getItem('id'),
      userId: ''
    }
  },
  props: ['question'],
  computed : { 
    ...mapState(['questions']),
    getUserId() {
      return this.$store.getters.getUserId
    },
    getLoginTrue() {
      return this.$store.getters.getLoginTrue
    }
  },
  computed: {
    timestamp: function () {
      return moment(this.question.createdAt).format('YYYY-MM-DD [at] hh:mm')
    }
  },
  methods: {
    getAll() {
      this.$store.dispatch('getAllQuestions')
    },
    getUpVoteDownVote() {
      let id = localStorage.getItem('id')
      let foundUpVote = this.question.upVotes.filter((userId) => userId == id)
      let foundDownVote = this.question.downVotes.filter((userId) => userId == id)
      if(foundUpVote.length > 0) {
        this.upvoted = true
      }
      if(foundDownVote.length > 0) {
        this.downvoted = true
      }
    },
    upVote(questionId) {
      // console.log('asd')
      if(localStorage.getItem('token')) {
        if(this.upvoted == false) {
          this.upvoted = true
          let id = localStorage.getItem('id')
          let found = this.question.upVotes.filter((userId) => userId == id)
          if(found.length == 0) {
            this.question.upVotes.push(id)
            let index = this.question.downVotes.findIndex((userId) => userId == id)
            if(index !== -1) {
              this.question.downVotes.splice(index,1)
            }
            this.$store.dispatch('upVote', questionId)
          }
          if(this.downvoted) {
            // console.log('ini if downovted')
            this.downvoted = false
            // this.$store.dispatch('upVote',questionId)
  
          }
        } else {
          this.upvoted = false
          let id = localStorage.getItem('id')
          let index = this.question.upVotes.findIndex((userId) => userId == id)
          this.question.upVotes.splice(index,1)
          this.$store.dispatch('upVote',questionId)
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
          this.downvoted = true
          let id = localStorage.getItem('id')
          let found = this.question.downVotes.filter((userId) => userId == id)
          if(found.length == 0) {
            this.question.downVotes.push(id)
            let index = this.question.upVotes.findIndex((userId) => userId == id)
            if(index !== -1) {
              this.question.upVotes.splice(index,1)
            }
            this.$store.dispatch('downVote', questionId)
          }
          // console.log(this.question.upVotes)
          // console.log(found)
          if(this.upvoted) {
            // console.log('ini if upvoted')
            this.upvoted = false
            // this.$store.dispatch('downVote', questionId)
          }
        } else {
          this.downvoted = false
          let id = localStorage.getItem('id')
          let index = this.question.downVotes.findIndex((userId) => userId == id)
          this.question.downVotes.splice(index,1)
          this.$store.dispatch('downVote', questionId)
        }
      } else {
        this.$swal({
          type: 'error',
          text: 'login to upvote/downvote',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('LOGIN_TRUE')
      this.userId = localStorage.getItem('id')
    }
    console.log(this.count)
    this.getAll()
  },
  mounted() {
    this.getUpVoteDownVote()
  },
  watch: {
    count: function() {
      this.getUpVoteDownVote()
    }
  }
}
</script>

<style scoped>
.upvoted {
  background-color: #FF8B60;
  color: white;
}

.downvoted {
  background-color: #9494FF;
  color: white;
}

</style>
