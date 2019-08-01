<template>
  <div class="d-flex justify-content-center">
    <div class="mypost" v-if="myquestions.length !== 0">
      <a-list
        class="comment-list"
        :header="`${myquestions.length} questions`"
        itemLayout="horizontal"
      >
        <eachquestion v-for="question in myquestions" :key="question._id" :dataquestion="question" />
      </a-list>
    </div>
    <div id="empty" v-if="myquestions.length <= 0">
      <h2>Question still empty! Go ask some question!</h2>
    </div>
  </div>
</template>

<script>
import eachquestion from "@/components/eachquestion.vue";
export default {
  name: "listQ",
  components: {
    eachquestion
  },
  computed: {
    myquestions() {
      return this.$store.state.myquestions;
    }
  },
  created() {
    if (localStorage.token) {
      this.$store.dispatch("GETMYQUESTION");
    } else {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
.mypost {
  width: 35rem;
  padding-top: 7rem;
}
#empty{
    padding-top: 7rem;
}
</style>
