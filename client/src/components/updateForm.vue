<template>
  <b-modal
      id="updateQuestion"
      title="Update Question"
      ref="my-modal"
      hide-footer
    >
      <form ref="form" @submit.prevent="updateQuestion(questionDetail._id)">
        <b-form-group
          label="Title"
          label-for="name-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="name-input"
            required
            v-model="question.title"
            type="text"
          ></b-form-input>
        </b-form-group>
         <b-form-group
          id="input-group-2"
          label="Content:"
          label-for="input-2"
          description="Input answer here."
        >
          <b-form-textarea
            id="textarea-auto-height"
            v-model="question.content"
            placeholder="Input content here"
            rows="8"
          ></b-form-textarea>
        </b-form-group>
        <b-button pill variant="success" class="float-right" @click.prevent="updateQuestion(questionDetail._id)" >Update</b-button>
      </form>
    </b-modal>
</template>

<script>
import axios from 'axios'
const baseUrl = `http://localhost:3000/api`
export default {
  data() {
    return {
      question: {
        title: '',
        content:  ''
      },
      updatedData: ''
    }
  },
  props: ['questionDetail'],
  methods: {
    updateQuestion(id) {
      axios.patch(`${baseUrl}/questions/${id}`, {
        title: this.question.title,
        content:  this.question.content
      },{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$swal({
            type: 'success',
            text: 'sukses update data',
            showConfirmButton:  false,
            timer: 1500
          })
          this.updatedData = data
          // console.log(data)
          this.hideModal()
          this.$emit('updatedData',data)
        })
        .catch((error) => {
         this.$swal({
            type: 'error',
            text: `${error.response.data.message}`,
            showConfirmButton:  false,
            timer: 1500
          })
        })
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>

</style>
