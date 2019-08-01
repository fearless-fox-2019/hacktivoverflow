<template>
  <form @sumbit.prevent="postQuestion" class="qform">
    <b-field label="Title">
      <b-input v-model="title"></b-input>
    </b-field>
    <b-field label="Comment">
      <b-input v-model="content" minlength="40" type="textarea"></b-input>
    </b-field>
    <b-field label="tags">
      <b-input v-model="tags"></b-input>
    </b-field>
    <b-button @click="postQuestion" >Post</b-button>
    <input type="submit" class="hidden-button">
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      tags: ""
    };
  },
  methods: {
    postQuestion() {
      let { title, content, tags } = this;
      let questionForm = { title, content, tags };
      console.log(questionForm);
      this.$store.dispatch('postQuestion',questionForm)
      this.title = ''
      this.content = ''
      this.tags = ''
      this.$emit('changeform')
    }
  }
};
</script>

<style scoped>
.button{
  width: 100px;
}
.hidden-button {
  width: 0px;
  height: 0px;
  padding: 0px;
  border: 0px;
  visibility: hidden;
}
.qform{
  max-width: 450px;
  margin: 25px auto;
  padding: 10px
  /* border: 1px solid goldenrod; */
}
</style>
