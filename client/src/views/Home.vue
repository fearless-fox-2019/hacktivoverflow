<template>
  <div class="home d-flex">
    <Sidebar class="col-2"></Sidebar>
    <div class="main col-10">
      <QuestionsList v-show="getIsQuestionDetail"></QuestionsList>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import QuestionsList from "@/components/QuestionsList.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      isQuestionDetail: true
    };
  },
  components: {
    Sidebar,
    QuestionsList
  },
  methods: {
    ...mapMutations(["changeLoginExist"]),
    ...mapActions(["fetchAllQuestions"])
  },
  computed: {
    ...mapGetters(["getLoginStatus", "getIsQuestionDetail"])
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.changeLoginExist();
    }
  }
};
</script>

<style scoped>
div.home {
  margin-top: 55px;
}
div.main {
  margin-left: auto;
  padding-top: 50px;
}
</style>
