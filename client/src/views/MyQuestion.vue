<template>
<div class="home my-containter container row">
    <div class="col-sm-4 d-flex justify-content-end">
      <Sidebar />
    </div>
    <div class="col-sm-8">
      <div class="col-sm-8 d-flex justify-content-between align-items-end header-all-question">
        <div><h4 slot="header" style="margin: 0;">My Questions</h4></div>
        <button @click="goToCreateQuestion()" class="btn btn-primary" style="max-height: 40px"><i class="fas fa-plus my-icon"></i>Ask Question</button>
      </div>
      <div v-if="!myQuestions.length" class="my-layout">
        <h5 style="margin: 0">You're not asking any question yet</h5>
      </div>
      <div v-else class="col my-layout">
        <QuestionList
          :questions="myQuestions"
          :manipulate="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QuestionList from '@/components/QuestionList.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'my-questions',
  components: {
    QuestionList,
    Sidebar,
  },
  computed: {
    myQuestions() {
      return this.$store.getters.myQuestions
    }
  },
  methods: {
    goToCreateQuestion() {
      localStorage.token ? this.$router.push('/question/ask') : this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.my-container {
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
}
.heads {
  display: flex;
  justify-content: space-between;
}
.header-all-question {
  position: fixed;
  width: 49.3%;
  z-index: 100;
  height: 50px;
  padding: 0px;
  padding-bottom: 10px;
  padding-top: 70px;
  background-color: #ffffff
}
.my-icon {
  margin-right: 10px
}
.my-layout {
  padding-top: 85px; padding-left: 5px; padding-right: 5px; padding-bottom: 5px; background-color: #E5E6E7; margin-bottom: 50px
}
</style>
