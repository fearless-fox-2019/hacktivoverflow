<template>
  <b-modal id="modal-1" title="Make a Question" @ok="makeQuestion(formQuestion)" @show="resetForm">
    <form class="d-flex flex-column">
      <input type="text" placeholder="Title..." v-model="formQuestion.title" />
      <label for>What to ask?</label>
      <textarea name id cols="30" rows="10" v-model="formQuestion.content"></textarea>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formQuestion: {
        title: "",
        content: ""
      }
    };
  },
  methods: {
    ...mapActions(["makeQuestion"]),
    resetForm() {
      (this.formQuestion.title = ""), (this.formQuestion.content = "");
    }
  }
};
</script>

<style scoped>
input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(153, 153, 153);
  margin-bottom: 20px;
}

textarea {
  height: 100px;
}
</style>
