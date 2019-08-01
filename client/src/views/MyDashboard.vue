<template>
  <div id="container" class="d-flex justify-content-between">

    <div class="col-12" id="content-body">
      <div id="content">
        <div class="question-container">
            <h2 style="text-align: left;">my<b>questions</b></h2>
            <div v-for="question in myQuestions" :key="question._id" class="question d-flex justify-content-between">
                <div>
                    <h3 @click="$router.push('/question/'+question._id)"><b>{{question.title}}</b></h3>
                    <h5>{{question.owner.username}}</h5>
                    <h6>{{convertDate(question.createdAt)}}</h6>
                </div>
                <div style="text-align: center;" class="d-flex align-items-center">
                    <div>
                        VOTE <br>
                        <span style="font-size: 22pt; font-weigth: bolder;">{{getTotalVote(question)}}</span> <br>
                        <button class="btn-default" v-b-modal="'modal-delete-question-'+question._id">delete<b>question</b></button>
                    </div>
                    <confirmation-modal :detail="{id: `delete-question-${question._id}`, title: 'Delete', message: 'Are you sure to delete this question?'}" @execute="deleteQuestion(question._id);"></confirmation-modal>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import ConfirmationModal from "@/components/ConfirmationModal.vue"

export default {
  name: 'dashboard',
  data(){
    return {
      myQuestions: []
    }
  },
  created() {
    this.fetchMyQuestion();
  },
  components: {
    ConfirmationModal
  },
  methods: {
    fetchMyQuestion(){
      this.myQuestions = [];
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_SERVER_URL}/questions?userId=${this.$store.state.userId}`
      })
        .then(({data}) => {
          this.myQuestions = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    convertDate(date) {
      const newDate = new Date(date);
      return newDate;
    },
    getTotalVote(question){
      let output = 0;
      question.votes.forEach((vote) => {
        output += vote.voteNumb;
      });
      return output;
    },
    deleteQuestion(questionId){
      axios({
        method: "DELETE",
        url: `${process.env.VUE_APP_SERVER_URL}/questions/${questionId}`,
        headers: {
          token: this.$store.state.token,
        }
      })
       .then(() => {
         this.$swal(
            'Succeed!!!',
            'Question has been deleted',
            'success',
          );
          this.fetchMyQuestion();
       })
       .catch((err) => {
         console.log(err);
       });
    }
  },
};
</script>

<style scoped>
  #container{
    padding: 15px;
    height: 90vh;
  }
  #content-body{
    height: 100%;
    padding: 10px;
  }
  #content{
    width: 100%;
    border: solid 1px black;
    height: 100%;
    background-color: #0b0c10;
    border-radius: 20px;
  }
  #extra-body{
    height: 100%;
    padding: 10px;
  }
  #extra{
    width: 100%;
    border: solid 1px black;
    height: 100%;
    background-color: #0b0c10;
    border-radius: 20px;
  }
  .question-container{
      padding: 20px;
      color: #66fcf1;
  }
  .question{
      text-align: left;
      padding: 15px;
      border: solid 2px #66fcf1;
      border-radius: 10px;
      margin-bottom: 20px;
      background-color: #c5c6c8;
      opacity: 0.8;
      color: black;
  }
  .question:hover{
      opacity: 1;
  }
  .btn-default{
      background-color: #0b0c10;
      border: solid 2px #66fcf1;
      border-radius: 5px;
      color: #c5c6c8;
      
  }
  .btn-default:hover{
        background-color: #66fcf1;
        color: #0b0c10;
  }
</style>
