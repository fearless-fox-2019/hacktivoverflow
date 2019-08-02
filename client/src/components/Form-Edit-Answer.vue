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
        <h1 style="font-size: 1.25em; font-weight: 600">Edit Answer</h1>
      </div>
      <div class="column is-half" style="display:flex; justify-content: flex-end">
        <b-button type="is-primary" style="font-weight: 600" @click.prevent="editAnswer">Edit Answer</b-button>
      </div>
    </div>
    <div class="column">
      <b-field label="Provide a Solution">
        <quill v-model="form.answer" output="html" style="height: 50vh;" :config="config"></quill>
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
        answer: null,
      },
      config: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [
              { list: 'ordered' },
              { list: 'bullet' },
            ],
          ],
        },
      },
    };
  },
  methods: {
    editAnswer() {
      const payload = {
        id: this.$route.params.id,
        answer: this.form.answer,
      };
      this.$store.dispatch('editAnswer', payload);
    },
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isLogin: state => state.isLogin,
    }),
  },
};
</script>

<style>

</style>
