<template>
<v-container>
<v-layout wrap>
  <v-card
    class="mx-auto"
    min-width="300"
    v-for="(user,i) in $store.state.users"
    :key="i"
  >
    <v-card-text>
      <div>Username</div>
      <p class="display-1 text--primary">
        {{user.username}}
      </p>
      <p>Total questions</p>
      <div class="display-1 text--primary">
        {{totalQuestion(user._id)}}
      </div>
      <p>Total answers</p>
      <div class="display-1 text--primary">
        {{totalAnswer(user._id)}}
      </div>
    </v-card-text>
  </v-card>
</v-layout>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed :{
    ...mapState(['questions', 'answers'])
  },
  methods : {
    totalQuestion(id){
      let filtered = this.questions.filter( el =>{
        if(el.userId._id == id){
          return el
        }
      })
      return filtered.length
    },
    totalAnswer(id){
      let filtered = this.answers.filter( el =>{
        if(el.userId._id == id){
          return el
        }
      })
      return filtered.length
    }
  }
}
</script>

<style>

</style>
