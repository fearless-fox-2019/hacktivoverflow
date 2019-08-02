<template>
     <div class="media-content">
        <div class="field">
        <p class="control">
            <b-field  class="has-text-left" label="Title">
                <b-input v-model="answer.title"></b-input>
            </b-field>
            <b-field  class="has-text-left" label="Description"></b-field>
            <wysiwyg v-model="answer.description" />
        </p>
        </div>
        <div class="field">
        <p class="control">
            <b-button @click="sendData" type="is-info">Post Your Answer</b-button>
            <b-button @click="$emit('cancel')" type="is-info">Cancel</b-button>
        </p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'formAnswer',
  props: ['answer'],
  methods: {
    sendData () {
      this.$mit('gotData', this.answer)
    }
  }
}
</script>

<style>

</style>
