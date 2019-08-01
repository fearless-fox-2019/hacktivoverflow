<template>
  <v-container align-start v-if="detailQuestion.title">
    <v-layout>
      <h1>{{detailQuestion.title}}</h1>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row style="padding:10px;min-height:200px">
      <v-flex md1 style="padding:5px;height:150px;margin-right:5px" align-self-center>
        <v-layout column justify-space-between style="margin-top:10px">
          <v-flex align-self-center style="padding:5px;height:40px">
            <v-btn @click="upvote">
              <v-icon>fas fa-arrow-up</v-icon>
            </v-btn>
          </v-flex>
          <v-flex align-self-center>
            <h2
              style="padding-top:5px; padding-bottom:0"
            >{{detailQuestion.upvotes.length - detailQuestion.downvotes.length}}</h2>
          </v-flex>
          <v-flex align-self-center style="padding:5px;height:50px">
            <v-btn @click="downvote">
              <v-icon>fas fa-arrow-down</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md10 style="background-color:grey;padding:5px">
        <v-layout column fill-height style="padding:10px;border:solid">
          <v-flex>{{detailQuestion.description}}</v-flex>
          <v-flex class="caption" align-self-end>
            <ModalForm v-if="user" :data="detailQuestion"/>
            <v-btn style="margin-top:5px" color="red" @click="deleteQuestion" v-if="user">DELETE</v-btn>
          </v-flex>
          <v-flex xs12 sm5 md5 offset-xs0 offset-lg10 class="caption" align-self-end>
            <span>{{ detailQuestion.createdAt | moment("from", "now") }}</span>
            <v-divider></v-divider>
            <span>by {{detailQuestion.userId.username}}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout>
      <h2>Answers</h2>
    </v-layout>
    <v-divider></v-divider>
    <v-container>
      <AnswerCard />
    </v-container>
    <v-container>
      <v-flex md10 style="background-color:grey;padding:5px">
        <v-form>
          <h2>Your Answer</h2>
          <v-textarea
            dark
            color="white"
            id="textarea"
            label="Description"
            name="description"
            type="textarea"
            auto-grow
            autofocus
            v-model="description"
          ></v-textarea>
        </v-form>
        <v-btn @click.prevent="createAnswer">Submit</v-btn>
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AnswerCard from "../components/AnswerCard";
import ModalForm from "../components/ModalForm"
import Swal from "sweetalert2";
export default {
  components: {
    AnswerCard,
    ModalForm
  },
  data() {
    return {
      detailQuestion: "",
      description: ""
    };
  },
  mounted() {
    this.$store.dispatch("getDetailQuestion", this.$route.params.id);
    this.$store.watch(this.$store.getters.getDetailQuestions, n => {
      this.detailQuestion = n;
    });
  },
  methods: {
    upvote() {
      this.$store.dispatch("upvote", this.$route.params.id);
    },
    downvote() {
      this.$store.dispatch("downvote", this.$route.params.id);
    },
    createAnswer() {
      this.$store.dispatch("createAnswer", {
        id: this.$route.params.id,
        description: this.description
      });
      Swal.fire({
        position: "top-end",
        type: "success",
        title: "Your answer has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      this.description = "";
    },
    deleteQuestion(){
      Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.value) {
    this.$store.dispatch('deleteQuestion', this.$route.params.id)
    this.$router.push('/')
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})
    }
  },
  computed : {
    user(){
      if(localStorage.getItem('userId') == this.detailQuestion.userId._id){
        return true
      }else{
        return false
      }
    }
  }
};
</script>

<style>
</style>
