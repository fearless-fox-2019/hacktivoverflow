<template>
  <div class="home">
    <!-- Card -->
      <b-row>
        <SideNav v-if="$store.state.isLogin"></SideNav>
        <b-col cols="7">
          <!-- Card -->
           <QuestionList v-for="question in questions" :key="question._id" :question="question"></QuestionList>
<!-- Card -->
        </b-col>
        <b-col cols="3">
          
          <h2 class="text-center">Post of the day</h2>
           <div class="card" style="background-color:#DCDCDC" v-for="highestVote in  highestVotes" :key="highestVote._id">
             <!-- <b-row></b-row> -->
              <b-col cols="12">
                <div class="card-body">
                  <h4 class="card-title"> {{highestVote.title}}</h4>
                  <p class="card-text">{{highestVote.content}}</p>
                  <!-- <p class="card-text"> {{highestVote.userId}}</p> -->
                </div>
              </b-col>
          </div>
         
        </b-col>
      </b-row>
<!-- Card -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import QuestionList from '../components/QuestionLists'
import SideNav from '../components/SideNav'
import {mapState} from 'vuex'
export default {
  name: 'home',
  components: {
    HelloWorld,
    QuestionList,
    SideNav
  },
 data() {
    return {
      upvoted: false,
      downvoted: false
    }
  },
  computed : { 
    ...mapState(['questions', 'highestVotes'])
  },
  methods: {
    getAll() {
      this.$store.dispatch('getAllQuestions')
    },
    getHighestVote() {
      this.$store.dispatch('getHighestVote')
    },
    upVote() {
      // console.log('asd')
      // if(this.upvoted == false) {
      //   this.upvoted = true
      //   let userId = localStorage.getItem('id')
      //   if(this.downvoted) {
      //     this.downvoted = false
      //   }
      // } else {
      //   this.upvoted = false
      // }
      // console.log(this.upvoted);
      // // let found = this.questions.filter((question => {

      // // }))
    }
    
  },
  created() {
    this.getAll()
    this.getHighestVote()
  }
}
</script>

<style scoped>
.home {
  background-color: #E8E8E8;
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
}


</style>

