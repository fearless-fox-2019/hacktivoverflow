<template>
  <div class="home">
    <!-- sidebar -->
    <b-container fluid>
      <b-row>
        <b-col cols=2 style="padding=0">
          <sidebar/>
        </b-col>
        <b-col cols=7>
          <button @click="askQuestion" class="button-ask">Ask a question</button>
          <list-question v-for="question in questions" :key="question._id" :question="question"/>
          <!-- <h3>{{questions}}</h3> -->
          <!-- <h4 v-for="question in questions" :key="question._id"> <router-link :to="`/question/${question._id}`">{{question.title}}</router-link></h4> -->
        </b-col>
      </b-row>
    </b-container>
    <!-- show all questions -->

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
import sidebar from '@/components/sidebar.vue'
import listQuestion from '@/components/listQuestion.vue'

export default {

  name: 'home',
  components: {
    HelloWorld,
    sidebar,
    listQuestion
  },
  data () {
    return {
      questionss: []
    }
  },
  methods: {
    askQuestion () {
      if (!localStorage.email) {
        this.$router.push('/login')
      } else {
        this.$router.push('/question/ask')
      }
    }
  },
  created () {
    this.$store.dispatch('getAllQuestions')
      .then(data => {
        this.questionss = data
        console.log(this.questions, 'ini questions<<<<<<<<<<<')
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    ...mapState(['questions'])
  }
}
</script>

<style>
  .button-ask{
    /* display : flex;
    align-items : flex-end; */
    margin-top : 10px;
    margin-left : 80%;
    border: none;
    height: 40px;
    background-color : #F78154;
    color : white
  }
  .footer-home{
    bottom: 0;
    margin-top: 30px;
    position: relative;
    background-color: #CD5334;
    height: 200px;
  }
</style>
