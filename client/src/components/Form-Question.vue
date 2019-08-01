<template>
  <div class="column" style="text-align: start; margin-left: 5vw; margin-bottom: 10vh">
    <b-loading :active.sync="isLoading">
      <b-icon
        pack="fas"
        icon="circle-notch"
        size="is-large"
        custom-class="fa-spin">
      </b-icon>
    </b-loading>
    <div class="columns">
      <div class="column is-half" style="display:flex">
        <h1 style="font-size: 1.25em; font-weight: 600">New Question</h1>
      </div>
      <div class="column is-half" style="display:flex; justify-content: flex-end">
        <b-button type="is-primary" style="font-weight: 600" @click.prevent="createQuestion">Ask Question</b-button>
      </div>
    </div>
    <div class="column">
        <b-field label="Question Title">
          <b-input class="is-6" v-model="form.title"></b-input>
        </b-field>
        <b-field label="Description About Your Problem">
          <quill v-model="form.question" output="html" style="height: 50vh;" :config="config"></quill>
        </b-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {
        title: null,
        question: null,
      },
      config: {
        placeholder: 'Insert Your Code Here',
          modules: {
          // syntax: true,
          toolbar: [ 
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [
              { 'list': 'ordered'},
              { 'list': 'bullet' }
            ],
          ]
        },
      }
    }
  },
  methods: {
    showCodeQuill(value) {
      this.isCode = value
    },
    createQuestion() {
      this.$store.dispatch('sendQuestion', this.form)
    }
  },
  computed: mapState({
    isLoading: state => state.isLoading
  })
}
</script>

<style>

</style>
