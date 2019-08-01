<template>
  <v-container>
    <div v-for="(detailAnswer,i) in detailQuestion.answers" :key="i">
      <v-layout row style="padding:10px;min-height:200px" v-if="detailAnswer.downvotes">
        <v-flex md1 style="padding:5px;height:150px;margin-right:5px" align-self-center>
          <v-layout column justify-space-between style="margin-top:10px">
            <v-flex align-self-center style="padding:5px;height:40px">
              <v-btn @click="upvote(detailAnswer._id)">
                <v-icon>fas fa-arrow-up</v-icon>
              </v-btn>
            </v-flex>
            <v-flex align-self-center>
              <h2
                style="padding-top:5px; padding-bottom:0"
              >{{detailAnswer.upvotes.length - detailAnswer.downvotes.length}}</h2>
            </v-flex>
            <v-flex align-self-center style="padding:5px;height:50px">
              <v-btn @click="downvote(detailAnswer._id)">
                <v-icon>fas fa-arrow-down</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-layout column height style="background-color:grey;padding:10px;border:solid">
          <v-flex>{{detailAnswer.description}}</v-flex>
          <v-flex class="caption" align-self-end>
            <ModalFormAnswer v-if="answerCreator(detailAnswer.userId)" :data="detailAnswer"/>
          </v-flex>
          <v-flex xs12 sm5 md5 offset-xs0 offset-lg10 class="caption" align-self-end>
            <span>{{ detailAnswer.createdAt | moment("from", "now") }}</span>
            <v-divider></v-divider>
            <span>by {{username(detailAnswer.userId)}} </span>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-divider></v-divider>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import ModalFormAnswer from './ModalFormAnswer'
export default {
  components :{
    ModalFormAnswer
  },
  data() {
    return {
      detailQuestion: ""
    };
  },
  methods: {
    upvote(id) {
      this.$store.dispatch("upvoteAnswer", id);
    },
    downvote(id) {
      this.$store.dispatch("downvoteAnswer", id);
    },
    username(id){
      let name
      this.$store.state.users.forEach(element => {
        if(element._id == id){
          name = element.username
        }
      })
      return name
    },
    answerCreator(id){
      if(localStorage.getItem('userId') == id){
        return true
      }
      else{
        return false
      }
    }
  },
  mounted() {
    this.$store.dispatch("getDetailQuestion", this.$route.params.id);
    this.$store.watch(this.$store.getters.getDetailQuestions, n => {
      this.detailQuestion = n;
    })
  }
};
</script>

<style>
</style>
