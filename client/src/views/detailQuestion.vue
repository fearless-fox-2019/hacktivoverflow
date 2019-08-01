<template>
    <div class="detail-question">
        <b-container>
            <b-row>
                <b-col cols=10>
                  <b-alert show variant="danger" v-if="error===true">{{errorMsg}}</b-alert>
                  <div class="question-detail">
                    <h3 class="title-ques">{{detailQuestion.title}}</h3>
                    <span>Asked : {{new Date(detailQuestion.createdAt).toLocaleString()}}</span>
                    <span style="margin-left: 10px;">by : {{detailQuestion.UserId.firstname}} {{detailQuestion.UserId.lastname}}</span>
                    <button v-if="detailQuestion.UserId.email == email"><i class="fa fa-edit"></i></button>
                    <button v-if="detailQuestion.UserId.email == email" @click="deleteQuestion(detailQuestion._id)"><i class="fa fa-trash"></i></button>
                    <hr>
                    <p>{{detailQuestion.question}}</p>
                    Tags : {{detailQuestion.tags}}
                    <!-- <h2>{{detailQuestion}}</h2> -->
                    <div class="votes">
                      <button @click="upvote" style="margin-right:15px; border:none;">Upvote</button>
                      <h5 style="margin-right:15px;"> {{upVote - downVote}} </h5> 
                      <button class="button-updown" @click="downvote">Downvote</button>
                    </div>
                  </div>

                  <div class="list-answer">
                    <h4>list answer</h4>
                    <listAnswer v-for="answer in answersQuestion" :key="answer._id" :answer="answer"/>
                  </div>

                  <div class="form-answer">
                    <h5>If you know the answer, you can answer and solve the others problem. Because helping other people is a good things for us;)</h5>
                    <h5 style="margin-top:40px;"><strong> Type your answer here ...</strong></h5>
                    <!-- title -->
                    <form @submit.prevent="answer">
                      <b-form-group id="answer-title" label="Title" label-for="answer-title" style="font-size:16px; margin-top:20px;">
                        <b-form-input type="text" v-model="answertitle"></b-form-input>
                      </b-form-group>
                      <wysiwyg v-model="answerContent" style="height:200px; margin-top:10px"></wysiwyg>
                      <div class="button-position">
                        <button class="button-submit-answer" type="submit">Answer</button>
                      </div>
                    </form>
                  </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '../config/axios.js'
import listAnswer from '../components/listAnswer.vue'

export default {
  components: {
    // wysiwyg
    listAnswer
  },
  data () {
    return {
      detailquestion: {},
      answertitle : "",
      answerContent : "",
      error : false,
      errorMsg : "",
      email : ""
    }
  },
  methods: {
    deleteQuestion (id) {
      console.log(id, 'ini id halo')
  console.log("triggeredd delete");
  
      this.$store.dispatch('deleteQuestion', id)
        .then(data => {
          console.log(data)
          this.$router.push('/')
          // alert('Success Delete!')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateQuestion () {
      let updateQuestion = {
        title: this.detailQuestion.title,
        question: this.detailQuestion.question,
        id: this.detailQuestion._id
      }
      console.log(updateQuestion, 'ini update question')

      this.$store.dispatch('updateQuestion', updateQuestion)
        .then(() => {
          this.detailQuestion.title = ''
          this.detailQuestion.question = ''
        })
        .catch(err => {
          console.log(err)
        })
    },
    patchUpdate (params) {
        let payload = {
            id : this.detailQuestion._id,
            data : params
        }

        this.$store.dispatch('patchUpdate', payload)
        .then((data) => {
            console.log("updated " +params);
            // console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    },
    answer(){
      let dataAnswer = {
        title : this.answertitle,
        content : this.answerContent,
        QuestionId : this.detailQuestion._id
      }
      this.$store.dispatch('answerQuestion', dataAnswer)
      this.reset()
    },
    upvote(){
      if(!localStorage.token){
        this.error = true
        this.errorMsg = "Login first"
      } else {
        console.log("ke trigered upvote");
        let id = this.$route.params.id
        axios({
          method : `PATCH`,
          url : `questions/upvote/${id}`,
          headers : {token : localStorage.token}
        })
        .then(({data}) => {
          console.log(data, "upvote updated!");
          this.$store.dispatch('getOneQuestion', id)
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    downvote(){
      if(!localStorage.token){
        this.error = true
        this.errorMsg = "Login first"
      } else {
        console.log("ke trigered downvote");
        let id = this.$route.params.id
        axios({
          method : `PATCH`,
          url : `questions/downvote/${id}`,
          headers : {token : localStorage.token}
        })
        .then(({data}) => {
          console.log(data, "downvote updated!");
          this.$store.dispatch('getOneQuestion', id)
        })
        .catch(err => {
          console.log(err);
        })
      }
    },
    reset(){
        this.answertitle = ""
        this.answerContent = ""
    }
  },
  created () {
    console.log(this.$route.params.id)
    this.email = localStorage.email
    console.log(this.email);
    
    let id = this.$route.params.id
    this.$store.dispatch('getOneQuestion', id)
    this.$store.dispatch('getAllAnswer', id)    
  },
  computed: {
    ...mapState(['detailQuestion', 'questions', 'answersQuestion', 'upVote', 'downVote'])
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
@import url('https://fonts.googleapis.com/css?family=Playfair+Display&display=swap');
.question-detail{
    border : 1px solid grey;
    padding: 20px;
}

.button-position{
  display: flex;
  justify-content: flex-end;
}

.button-submit-answer{
  border: none;
  width: 200px;
  height: 40px;
  margin-top: 30px; 
  margin-left: 90%;
}
.form-answer{
  margin-top : 40px;
}

.votes{
  display: flex;
  justify-content: flex-end;
  margin-top : 30px;
  margin-left : 50%;
}

.list-answer{
  margin-top : 30px;
  margin-left : 20px;
}

.title-ques{
  font-family: 'Playfair Display', serif;
  font-size : 30px;
}

.button-updown{
  border : none;
  /* background-color : #fff; */
}
</style>
