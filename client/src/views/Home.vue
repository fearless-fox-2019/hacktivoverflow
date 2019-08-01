<template>
  <div class="home">
    <div class="container">
      <div class="mt-5 row" style="margin-top: 10px; width: 450px; justify-content: left; margin-bottom: 10px; margin-left: 0px">
        <div style="margin-right: 10px; background: gainsboro; border-radius: 4px; padding: 5px;">
          <a href="" style="color: white" @click.prevent="$store.dispatch('getQuestions')">All Question</a>
        </div>
        <div style="background: gainsboro; border-radius: 4px; padding: 5px">
          <a href="" style="color: white" @click.prevent="questionsByMyTag">Question by Watched Tags</a>
        </div>
        <div style="background: gainsboro; border-radius: 4px; padding: 5px; text-align: center; width: 250px;position: absolute; right: 75px">
          <a style="color: white"><strong>{{$store.state.tag}}</strong></a>
        </div>
      </div>
      <div class="row">
        <div class="col-9">
          <div v-for="(question, index) in questions" :key="index">
            <EachQuestion :question="question" :index="index"/>
          </div>
        </div>
        <div class="col-3" style="display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: flex-start">
          <div class="container">
            <div class="row" style="justify-content: center">
              <b-list-group horizontal style="display: flex; flex-wrap: wrap; justify-content: flex-end">
                <b-list-group-item v-for="(tag, index) in tags" :key="index" style="background: gainsboro !important; color: white !important; margin-bottom: 7px; margin-left: 7px; border-radius: 4px">
                  <div class="container" style="display: flex; flex-direction: column; justify-content: center">
                    <div class="row" style="justify-content: center;">
                      <a style="text-decoration: none !important; color: white" href="" @click.prevent="seeTag(tag)">
                        <small>{{tag}}</small>
                      </a>
                    </div>
                    <div class="row" style="justify-content: center; height: auto">
                        <a href="" style="text-decoration: none; color: white" @click.prevent="addWatchTag(tag)">
                          <i class="far fa-eye"></i>
                        </a>
                    </div>
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EachQuestion from "@/components/EachQuestion.vue";
import api from "@/api/api.js";

export default {
  name: "home",
  data(){
    return {
      search : ''
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    },
    tags() {
      this.$store.commit('retrieveTags')
      console.log(this.$store.state.tags)
      return this.$store.state.tags
    },
  },
  components: {
    EachQuestion
  },
  methods: {
    seeTag(tag) {
      this.$router.push(`/tag/${tag}`)
    },
    addWatchTag(tag) {
      this.$store.dispatch('addWatchTag', tag)
    },
    allQuestions() {
      this.$store.dispatch('getQuestions')
    },
    questionsByMyTag() {
      this.$store.dispatch('questionsByMyTag')
    }
  },
  created() {
    this.$store.dispatch("getQuestions");
  }
};
</script>
