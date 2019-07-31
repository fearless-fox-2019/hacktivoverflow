<template>
  <b-modal
      id="updateAnswer"
      title="Update Answer"
      ref="my-modal"
      hide-footer
    >
      <form ref="form">
        <b-form-group
          label="Title"
          label-for="name-input"
          invalid-feedback="Title is required"
        >
          <b-form-input
            id="name-input"
            required
            v-model="answer.title"
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
            v-model="answer.content"
            placeholder="Input content here"
            rows="8"
          ></b-form-textarea>
        </b-form-group>
        <b-button pill variant="success" class="float-right" @click.prevent="updateAnswer($store.state.commentId)" >Update</b-button>
      </form>
    </b-modal>
</template>

<script>
import axios from 'axios'
const baseUrl = `http://localhost:3000/api`
export default {
  data() {
    return {
      answer: {
        title: '',
        content: ''
      }
    }
  },
  props: ['comments'],
  methods: {
    updateAnswer(id) {
      console.log('asdf')
      // console.log('asd')
      axios.patch(`${baseUrl}/answers/${id}`,{
        title: this.answer.title,
        content: this.answer.content
      },{
        headers: {
          'token': localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          // console.log('asd halo halo')
          // console.log(data);
          this.$store.commit('UPDATED_COMMENT',data)
          this.$emit('commentUpdated', data)
          this.hideModal()
        })
        .catch((error) => {
          console.log(error)
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
