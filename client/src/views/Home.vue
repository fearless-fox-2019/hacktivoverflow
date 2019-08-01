<template>
  <div class="home">
    <div class="columns is-desktop is-variable is-1">
      <div class="column is-2">
        <h1>left side</h1>
      </div>
      <div class="column is-7">
        <div class="option">
          <h1>All question</h1>
          <b-button @click="showform">Add new Question</b-button>
        </div>
        <div>
          <questionForm v-show="isForm" @changeform="showform"/>
        </div>
        <questionCard v-for="(question,i) in $store.state.allQuestion" :key="i" :question="question"/>
      </div>
      <div class="column is-3">
        <tagside/>
      </div>
    </div>
  </div>
</template>

<script>
import questionCard from '@/components/questionCard.vue'
import questionForm from '@/components/questionForm.vue'
import tagside from '@/components/tagside.vue'

export default {
  components: {
    questionCard,
    questionForm,
    tagside
  },
  data(){
    return {
      isForm: false
    }
  },
  methods: {
    showform(){
      if(this.isForm){
        this.isForm = false
      } 
      else {
        this.isForm = true
      }
    }
  },
  created() {
    this.$store.commit("checkLocal");
    if (!this.$store.state.isLogin) {
      // this.$router.push("/landing");
    }
    this.$store.dispatch("whoami");
    this.$store.dispatch("getTags")
    this.$store.dispatch("fetchQuestion")
  }
};
</script>

<style scoped>
.column {
  border: 1px solid salmon;
}
.option{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 20px;
  align-items: center;
}
</style>
