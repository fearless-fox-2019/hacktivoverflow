<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <form-question></form-question>
    </div>
  </div>
</template>

<script>
import FormQuestion from '../components/Form-Question.vue';
import SideBar from '../components/Side-Bar.vue';

export default {
  components: {
    FormQuestion,
    SideBar
  }
};
</script>

<style>

</style>
