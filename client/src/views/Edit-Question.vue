<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <form-edit-question></form-edit-question>
    </div>
  </div>
</template>

<script>
import FormEditQuestion from '../components/Form-Edit-Question.vue';
import SideBar from '../components/Side-Bar.vue';

export default {
  components: {
    FormEditQuestion,
    SideBar
  }
};
</script>

<style>

</style>
