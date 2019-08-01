<template>
  <b-card>
      <h3>New Question</h3>
      <b-form>
          <label>Title</label>
          <b-input v-model="question.title" placeholder="title . . . ."></b-input>
          <label>Description</label>
          <b-textarea v-model="question.description" placeholder="Description . . . ."></b-textarea>
          <label>Tags</label>
            <!-- <b-row v-for="(tag, index) in tags" :key="index">
                <b-col>
                    <h6><b-badge variant="success">tag</b-badge></h6>
                </b-col> -->
                <!-- <b-col>
                    <h6><b-badge @click="addt('nodejs')" variant="success">nodejs</b-badge></h6>
                </b-col>
                <b-col>
                    <h6><b-badge @click="addt('threejs')" variant="warning">threejs</b-badge></h6>
                </b-col>
                <b-col>
                    <h6><b-badge @click="addt('javascripts')" variant="info">javascripts</b-badge></h6>
                </b-col>
                <b-col>
                    <h6><b-badge @click="addt('phyton')" variant="danger">phyton</b-badge></h6>
                </b-col>
                <b-col>
                    <h6><b-badge @click="addt('vue')" variant="success">vue</b-badge></h6>
                </b-col>
                <b-col>
                    <h6><b-badge @click="addt('bootstrap')" variant="primary">bootstrap</b-badge></h6>
                </b-col> -->
            <!-- </b-row> -->
            <p><b>example: </b> nodejs, threejs <b>ada ',' dan 'spasi'</b></p>
          <b-input v-model="question.tags" placeholder=" example: nodejs<','><space>threejs -> nodejs, threejs"></b-input>
          <!-- <p>your tag {{question.tags}}</p> -->
          <br>
          <b-button @click="questionAdd" variant="info">Ask</b-button>
      </b-form>
  </b-card>
</template>

<script>
// import vueWysiwyg from '../vueWysiwyg'
// import {mapState} from 'vuex'
export default {
    data() {
        return {
            question: {
                title: "",
                description: "",
                tags: ''
            },
        };
    },
    components: {
        // wysiwyg: vueWysiwyg.component
    },
    methods: {
        addt(value){
            this.question.tags.push(`${value}`)
        },
        newtag(){
            console.log(this.question.tags, 'qtags')
            this.$store.dispatch("newtag", this.question);
            this.$router.push("/");
        },
        questionAdd() {
            console.log(this.question)
        this.$store.dispatch("newquestion", this.question);
        this.$router.push("/");
        },
    },
};
</script>

<style>
</style>
