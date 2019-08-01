<template>
    <div class="add-question">
      <div class="form-add-question">
        <h3 style="margin-bottom: 20px;">Free to asking, solve your problem here!</h3>
        <form @submit.prevent="create">
          <b-form-group id="title-question" label="Title" label-for="title">
            <b-form-input id="title" type="text" placeholder="Title" v-model="question.title"></b-form-input>
          </b-form-group>
          <b-form-group id="question" label="Question" label-for="question">
            <b-form-input id="question" type="text" placeholder="Question" v-model="question.question"></b-form-input>
          </b-form-group>
          <wysiwyg style="margin-bottom:20px; "/>
          <b-form-group id="tags" label="Tags" label-for="tag">
            <b-form-input id="tag" type="text" placeholder="sperate with , ex : javascript,java,ruby" v-model="question.tags"></b-form-input>
          </b-form-group>
          <div class="button-create" >
            <button class="button-cre" type="submit">Create</button>
          </div>
        </form>
      </div>
        <div class="">
            <!-- <router-view></router-view> -->
        </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      question: {
        title: '',
        question: '',
        tag: ''
      }
    }
  },
  methods: {
    create () {
      console.log(this.question)
      let newQuestion = {
        title: this.question.title,
        question: this.question.question,
        tags: this.question.tags
      }
      this.$store.dispatch('createQuestion', newQuestion)
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.form-add-question{
  border : 0.5px solid grey;
  width : 75%;
  padding: 3%;
  margin-left : 10%;
  border-radius: 20px;
}

.button-cre{
  border : none;
  width : 100px;
  height: 40px;
}

.button-cre:hover{
  background-color : #F78154;
  color : #fff
}

.button-create{
  display: flex;
  justify-content: flex-end;
  margin-top : 30px;
  margin-right: 30px;
}
</style>
