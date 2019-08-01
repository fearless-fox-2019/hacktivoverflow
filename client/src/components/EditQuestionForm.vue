<template>
  <b-modal
    id="editQuestion"
    title="Edit a Question"
    @ok="updateQuestion({question, id: question._id})"
  >
    <form class="d-flex flex-column">
      <input type="text" placeholder="Title..." v-model="question.title" />
      <label for>What to ask?</label>
      <textarea name id cols="30" rows="10" v-model="question.content"></textarea>
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["question"],
  methods: {
    ...mapActions(["updateQuestion"])
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
