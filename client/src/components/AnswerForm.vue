<template>
  <div class="card-title mt-4">
    <h3>
      Post your insights here!
    </h3>
    <div>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Title:"
          label-for="input-1"
          description="Input title here."
        >
          <b-form-input
            id="input-1"
            type="text"
            required
            v-model="title"
            placeholder="Enter Title"
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
            placeholder="Input content here"
            v-model="content"
            rows="3"
            max-rows="8"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" class="float-right" @click.prevent="addComment">Submit</b-button>
      <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
      </b-form>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    addComment() {
      let idQuestion = this.$route.params.id
      // console.log(idQuestion)
      let input = {
        title: this.title,
        content: this.content,
        questionId: idQuestion
      }
      console.log(input)
      if(localStorage.getItem('token')) {
        this.$store.dispatch('addComment', input)
      } else {
        this.$swal({
          type: 'error',
          text: 'login to add comment',
          showConfirmButton: false,
          timer: 1500
        })
      }
      this.title = ''
      this.content = ''
    }
  }
}
</script>

<style>

</style>
