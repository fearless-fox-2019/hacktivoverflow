<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <question-detail></question-detail>
    </div>
  </div>
</template>

<script>
import SideBar from '../components/Side-Bar.vue';
import QuestionDetail from '../components/Question-Detail.vue';

export default {
  components: {
    QuestionDetail,
    SideBar
  }
}
</script>

<style>

</style>
