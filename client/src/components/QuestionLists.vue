<template>
<div>
  <div class="card flex-row mt-2" v-for="question in questions" :key="question._id">
    <b-col cols="1" align-self="start" class="mt-3 ml-3 voteLength">
      <i class="fas fa-arrow-up"></i>
      <br>
      {{question.upVotes.length - question.downVotes.length}}
      <br>
      <i class="fas fa-arrow-down"></i>
    </b-col>
    <b-col cols="11">
      <div class="card-body">
        <!-- Title -->
        <h4 class="card-title">{{question.title}}</h4>
        <!-- Text -->
        <p class="card-text">{{question.content}}</p>
        <!-- Button -->
        <span class="count-icon">
            <i class="fa fa-comments" aria-hidden="true"></i> 
          <span class="count">{{question.answerId.length}} </span>
        </span>
      </div>
    </b-col>
  </div>
</div>
  
</template>

<script>
import  {mapState} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed : { 
    ...mapState(['questions'])
  },
  methods: {
    getAll() {
      this.$store.dispatch('getAllQuestions')
    },
    
  },
  created() {
    this.getAll()
  }
}
</script>

<style>

</style>
