<template>
  <div class="home">
    <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="15">
        <h1>What's Your Problem</h1>
        <addingQuestion v-if="isLogin" />
        <questionList />
      </a-col>
      <a-col :span="7">
        <div id="watched">
          <searchInput /><br><br>
          <addWatchedTag v-if="isLogin" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import addingQuestion from "@/components/addingQuestion.vue";
import questionList from "@/components/questionlist.vue";
import addWatchedTag from "@/components/addWatchedTags.vue"
import searchInput from "@/components/searchInput.vue"

import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    addingQuestion,
    questionList,
    addWatchedTag,
    searchInput
  },
  computed: {
    ...mapState(["isLogin"])
  },
  created(){
    console.log('masuk home');

  },
  methods: {
    
  },
};
</script>

<style>
.home {
  padding-top: 100px;
}
#watched {
    padding-top: 50px;
    padding-right: 25px;
}
</style>
