<template>
  <div class="d-flex justify-content-center">
    <div class="mytag">
      <a-icon type="search" />Search for
      <em>
        <b>{{$route.params.tag}}</b>
      </em> keyword based on recent activity
      <br />
      <a-list
        class="comment-list"
        :header="`${questions.length} found`"
        itemLayout="horizontal"
      >
        <eachquestion v-for="question in questions" :key="question._id" :dataquestion="question" />
      </a-list>
    </div>
  </div>
</template>

<script>
import eachquestion from "@/components/eachquestion.vue";
import { mapState } from "vuex";

export default {
  name: "listQ",
  components: {
    eachquestion
  },
  computed: {
    ...mapState(["questions"])
  },
  created() {}
};
</script>

<style>
.mytag {
  width: 35rem;
  padding-top: 9rem;
}
</style>
