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
          <div class="card">
            <div class="card-body">
              <h4 class="card-title"> Card Title</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. </p>
            </div>
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
    ...mapState(['questions'])
  },
  methods: {
    getAll() {
      this.$store.dispatch('getAllQuestions')
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

