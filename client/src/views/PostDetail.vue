<template>
  <div>
    <b-row>
      <SideNav v-if="$store.state.isLogin"></SideNav>
        <b-col cols="9" >
         <div class="card flex-row mt-2" >
            <b-col cols="1" align-self="start" class="mt-3 voteLength" >
              <div class="ml-3">
                <a @click.prevent="upVote(questionDetail._id)" :style="upvoted ? 'color: orange;' : 'color: black;'">
                  <i class="fas fa-arrow-up"  >
                  </i>
                </a>
                <br>
                {{questionDetail.upVotes.length - questionDetail.downVotes.length}}
                <br>
               <a @click.prevent="downVote(questionDetail._id)" :style="downvoted ? 'color: orange;' : 'color: black;'">
                  <i class="fas fa-arrow-down"  >
                  </i>
                </a>
              </div>
            </b-col>
            <b-col cols="11">
              <div class="card-body">
                <!-- Title -->
                <h4 class="card-title">{{questionDetail.title}}</h4>
                <!-- Text -->
                <p class="card-text">
                 {{questionDetail.content}}
                </p>
                Created By: {{questionDetail.userId.username}}
                <br>
                <div class="float-right">
                  <b-button v-if="questionDetail.userId._id == userId" v-b-modal.updateQuestion>
                    Update
                  </b-button>
                  <b-button v-if="questionDetail.userId._id == userId" @click="deleteQuestion">
                    Delete
                  </b-button>
                  <UpdateForm :questionDetail="questionDetail" @updatedData="getPostDetail"></UpdateForm>

                </div>
                <!-- Button -->
                <AnswerForm></AnswerForm>
                <br>
                <br>
                <br>
                <h3>
                  Comments:
                </h3>
                <AnswerList v-for="comment in comments" :key="comment._id" :comment="comment" :answerUpdated="answerUpdated" ></AnswerList>
                <updateAnswer @commentUpdated="updatedQuestion"></updateAnswer>
              </div>
            </b-col>
          </div>
        </b-col>

    </b-row>
  </div>

</template>

<script>
import SideNav from '../components/SideNav'
import AnswerForm from '../components/AnswerForm'
import {mapState} from 'vuex'
import AnswerList from '../components/AnswerList'
import UpdateForm from '../components/updateForm'
import updateAnswer  from '../components/updateAnswer'
const baseUrl = `http://35.240.152.123/api`

import axios from 'axios'


export default {
  data() {
    return {
      upvoted: false,
      downvoted: false,
      questionDetail: {},
      userId: '',
      questionId: '',
      answerUpdated: ''
    }
  },
  components: {
    SideNav,
    AnswerForm,
    AnswerList,
    UpdateForm,
    updateAnswer
  },
  computed: {
    ...mapState(['comments']),
    getUserId() {
      return this.$store.getters.getUserId
    }
  },
  // props: ['idAnswer'],
  methods: {
    deleteQuestion() {
      let id = this.$route.params.id
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        this.$store.dispatch('deleteQuestion',id)
          // this.$route.push('/')
        if (result.value) {
          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      }
    )},
    updatedQuestion(val) {
      console.log('WOIII MASUK SINI NGAK')
      console.log(val)
      this.answerUpdated= val
      // console.log(val)
    },
    getUpVoteDownVote: function() {
        let id = localStorage.getItem('id')
        let foundUpVote = this.questionDetail.upVotes.filter((userId) => userId == id)
        let foundDownVote = this.questionDetail.downVotes.filter((userId) => userId == id)
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
          // this.$store.commit('UPVOTED', true)
          this.upvoted = true
          // this.$store.state.upvoted = true
          let id = localStorage.getItem('id')
          let found = this.questionDetail.upVotes.filter((userId) => userId == id)
          if(found.length == 0) {
            this.questionDetail.upVotes.push(id)
            let index = this.questionDetail.downVotes.findIndex((userId) => userId == id)
            if(index !== -1) {
              this.questionDetail.downVotes.splice(index,1)
            }
            this.$store.dispatch('upVote', questionId)
          }
          if(this.downvoted) {
            this.downvoted = false
  
          }
        } else {
          this.upvoted = false
          let id = localStorage.getItem('id')
          let index = this.questionDetail.upVotes.findIndex((userId) => userId == id)
          this.questionDetail.upVotes.splice(index,1)
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
          let found = this.questionDetail.downVotes.filter((userId) => userId == id)
          if(found.length == 0) {
            this.questionDetail.downVotes.push(id)
            let index = this.questionDetail.upVotes.findIndex((userId) => userId == id)
            if(index !== -1) {
              this.questionDetail.upVotes.splice(index,1)
            }
            this.$store.dispatch('downVote', questionId)
          }
          // console.log(this.question.upVotes)
          // console.log(found)
          if(this.upvoted) {
            this.upvoted = false
          }
        } else {
          
          this.downvoted = false
          let id = localStorage.getItem('id')
          let index = this.questionDetail.downVotes.findIndex((userId) => userId == id)
          this.questionDetail.downVotes.splice(index,1)
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
    },
    getPostDetail() {
      const id = this.$route.params.id
       axios.get(`${baseUrl}/questions/${id}`)
        .then(({data}) => {
          this.questionDetail = data
          this.getUpVoteDownVote()
        })
        .catch((error) => {
          console.log(error)
        })
      // console.log(id)
    },
    updatePostDetail() {

    },
    getComments() {
        let id = this.$route.params.id
        this.$store.dispatch('commentsByUser',id)
        // console.log('asd')
      }
    },

  created() {
    if(localStorage.getItem('token')) {
      this.userId = localStorage.getItem('id')
    }
    this.getPostDetail()
    this.getComments()
    // console.log('question detail mounted =====', this.$store.state.questionDetail)
  }
}
</script>

<style>

</style>
