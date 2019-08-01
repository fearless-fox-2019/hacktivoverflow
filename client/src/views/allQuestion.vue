<template>
  <div id="questionList">
    <div v-for="question in questions" :key="question._id">
        <questionCard></questionCard>
    </div>
  </div>
</template>

<script>
import questionCard from "@/components/questionCard.vue";

export default {
  name: 'allQuestion',
  props: ['loggedIn'],
  data(){
    return{
        questions : [],
    }
  },
  components: {
    questionCard
  },
  computed: {
    url() {
      return this.$store.state.url;
    }
  },
  methods: {
    fetchQuestion(){
      console.log('masuk ke fetchQuestion')
      axios({
          method : 'GET',
          url : `${serverURL}/questions/`,
        })
        .then(({data}) =>{
          this.questions = data
          console.log(this.questions)
        })
        .catch((err) =>{
          console.log(err)
        })
    }
  },
  created(){
    fetchQuestion()
  }
}
</script>
