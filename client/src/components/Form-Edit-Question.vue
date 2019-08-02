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
        <h1 style="font-size: 1.25em; font-weight: 600">Edit Question</h1>
      </div>
      <div class="column is-half" style="display:flex; justify-content: flex-end">
        <b-button type="is-primary" style="font-weight: 600" @click.prevent="editQuestion">Edit Question</b-button>
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
  created() {
    this.$store.dispatch('getSelectedQuestion', this.$route.params.id);
  },
  data() {
    return {
      form: {
        title: null,
        question: null,
      },
      config: {
        modules: {
          // syntax: true,
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
    editQuestion() {
      const payload = {
        id: this.$route.params.id,
        title: this.form.title,
        question: this.form.question,
      };
      this.$store.dispatch('editQuestion', payload);
    },
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isLogin: state => state.isLogin,
    }),
    getSelected() {
      return this.$store.getters.getSelected(this.$route.params.id);
    },
  },
  watch: {
    getSelected() {
      this.form.title;
    },
  },
};
</script>

<style>

</style>
