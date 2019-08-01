<template>
  <div>
    <!-- <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button> -->

    <b-modal
      id="addQuestion"
      ref="modal"
      title="Create a Post"
      hide-footer
    >
    <b-form @submit.prevent="addQuestion">
        <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1"
          description="Input title here."
        >
          <b-form-input
            id="input-1"
            type="text"
            v-model="question.title"
            required
            placeholder="Enter Title"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Content:"
          label-for="input-2"
          description="Input question here."
        >
          <b-form-textarea
            id="textarea-auto-height"
            placeholder="Input content here"
            v-model="question.content"
            rows="8"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" class="float-right">Submit</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>
    </b-modal>
  </div>

  
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    addQuestion() {
      this.$store.dispatch('addQuestion', this.question)
      this.$refs['modal'].hide()
      this.$router.push('/')
    }
  }

}
</script>

<style>

</style>
