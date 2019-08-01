<template>
  <div class="about" style="background-color: rgba(255,255,255,0.5); height: 100vh">
    <section style="margin-right:100px;">
      <br />
      <b-field horizontal label="Title">
        <b-input v-model="form.title" name="title" expanded></b-input>
      </b-field>
      <b-field horizontal label="Question">
        <b-input v-model="form.description" type="textarea"></b-input>
      </b-field>
      <b-field horizontal label="Enter some tags">
        <b-taginput
          v-model="form.tags"
          :data="dataTags"
          autocomplete
          :allow-new="allow"
          icon="label"
          placeholder="Add a tag"
          @typing="getFilteredTags"
        ></b-taginput>
      </b-field>

      <b-field horizontal>
        <p class="control">
          <button v-if="!loading" @click="addQuestion" class="button is-primary">Send Question</button>
          <b-button v-if="loading" class="is-primary" loading>Loading</b-button>
        </p>
      </b-field>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created(){
    this.$store.dispatch('getAllTags')
      .then(() => {}).catch((err) => {})
  },
  data() {
    return {
      form: {},
      loading: false,
      dataTags: this.allTags,
      allow:true
    };
  },
  computed: {
    ...mapState(["allTags"])
  },
  methods: {
    addQuestion() {
      this.loading = true;
      this.$store
        .dispatch("addQuestion", this.form)
        .then(data => {
          this.loading = false;
          this.$router.push("/");
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getFilteredTags(text) {
      this.dataTags = this.allTags.filter(option => {
        return option.toLowerCase().includes(text.toLowerCase())
      });
    }
  }
};
</script>

