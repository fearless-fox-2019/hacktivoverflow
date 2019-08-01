<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <form-edit-answer></form-edit-answer>
    </div>
  </div>
</template>

<script>
import FormEditAnswer from '../components/Form-Edit-Answer.vue';
import SideBar from '../components/Side-Bar.vue';

export default {
  components: {
    SideBar,
    FormEditAnswer
  }
}
</script>

<style>

</style>
