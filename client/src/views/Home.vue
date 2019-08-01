<template>
  <div class="home">
      <navBar></navBar>
      <!-- Searchbar and Data User -->
      <div class="tile is-ancestor container" id="bar-container" style="height: 200px">
        <div class="tile is-parent is-8" >
          <article class="tile is-child box " style="background-color: lightgoldenrodyellow">
            <p class="title is-3">Search some question</p>
            <div class="content is-paddingless">
              <form @submit.prevent="searchQuestion">
                <b-field style="margin-top: -10px">
                  <b-input placeholder="Your Question..."
                      v-model="keyword"
                      type="search"
                      icon="magnify"
                      rounded
                      style="width: 100%"
                    >
                  </b-input>
                  <p class="control">
                      <button class="button is-primary">Search</button>
                  </p>
                </b-field>

              </form>
              <p style="margin-top: 5px">Or ask new question</p>
              <a @click="toAdd" class="button is-success is-focused is-small" style="margin-top: -10px">New Question</a>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article id="board-box" class="tile is-child box">
            <p class="subtitle" style="font-weight: bold">Your Post</p>
            <div class="content" style="border-top: 2px solid black">
              <div class="columns">
                <div class="column" style="border-right: 2px solid black">
                  <p id="board-title">My Questions</p>
                  <p @click="toMyQuestion" id="my-question">{{myQuestion.length}}</p>
                </div>
                <div class="column">
                  <p id="board-title">My Answers</p>
                  <p style="font-size: 24px; font-weight: bold">{{myAnswer.length}}</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <hr id="section-part">
      <!-- Row Content and user Tag -->
      <div class="columns container" style="margin-left: 5%">
        <div class="column">
          
          <div class="box">
            <p class="title is-5 has-text-left">All Questions</p>
            <p v-if="allQuestion.length === 0" class="title is-6"> No Question!</p>
            <div v-for="question in allQuestion" :key="question._id">
              <cardQuestion :question="question"></cardQuestion>
            </div>
          </div>
        </div>
        <div class="column  is-narrow">
          <div class="card" style="width: 300px;">
              <header class="card-header"  style="background-color: lightsalmon; border-bottom: 2px solid coral">
                <p class="card-header-title">
                  Watched Tag
                </p>
                <a @click="toEditTag" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                   <i class="fas fa-edit"></i>
                  </span>
                </a>
              </header>
              <div class="card-content">
                <div class="content" >
                  <div class="field" style="margin-bottom: -10px" >
                    <div v-if="editTag === 'no' " class="tags">
                        <span v-for="(tag, index) in userTags" 
                            :key="index"
                            @click.prevent="searchTag(tag)" 
                            class="tag is-danger">
                            <a style="color: white">{{tag}}</a>
                        </span>
                    </div>
                  </div>
                    <div v-if="editTag === 'ok'">
                      <b-taginput 
                        v-model="userTags"
                        ellipsis
                        icon="label"
                        placeholder="Add a tag"
                        style="margin-bottom: 5px"
                      >
                    </b-taginput>
                    <div style="display: flex; justify-content: space-around">
                      <b-button @click="updateTag" type="is-success is-small">Save</b-button>
                      <b-button @click="cancelEditTag" type="is-warning is-small">Cancel</b-button>
                    </div>

                    </div>
                    
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navBar from '@/components/navbarLogin.vue'
import cardQuestion from '@/components/cardQuestion.vue'

export default {
  name: 'home',
  components: {
    navBar,
    cardQuestion
  },
  data(){
    return {
      newTag:'',
      keyword:'',
      editTag: 'no'


    }
  },
  methods:{
      ...mapActions(['getAllQuestion', 'getUser','updateUserTags', 'getMyQuestion', 'getMyAnswer']),
      deleteTag(){

      },
      toAdd(){
        this.$router.push('/post-question')
      },
      toMyQuestion(){
        this.$router.push('/my-question')
      },
      searchQuestion(){
        this.getAllQuestion('/questions?title='+this.keyword)
      },
      searchTag(tag){
        console.log('masuk search tag', tag)
        this.getAllQuestion('/questions?tag='+tag)
      },
      toEditTag(){
        this.editTag= 'ok'
      },
      cancelEditTag(){
        this.editTag= 'no'
      },
      updateTag(){
        this.editTag='no'
        this.updateUserTags(this.userTags)
        
      }
  },
  computed:{
    ...mapState(['userTags', 'allQuestion', 'myQuestion', 'myAnswer'])

  },
  created(){
    this.getAllQuestion('/questions')
    this.getMyQuestion()
    this.getMyAnswer()
    this.getUser()
  }
}
</script>

<style scoped>
 #bar-container{
   margin-top: 5%;
   margin-left: 5%;

 }
 #section-part{
   width: 1200px;
   height: 2px;
   background-color: rgba(0, 0, 0, 0.5);
   margin-left: 3%;
   box-shadow: 2px 2px 4px coral

 }

 #tag:hover{
   cursor: pointer
 }

 #my-question{
  font-size: 24px;
  font-weight: bold;
 }

 #my-question:hover{
   cursor: pointer;
 }
 #board-box{
   background-color: lightgoldenrodyellow
 }
 #board-title{
   margin-top: 10px;
   font-weight: bold;
   color: lightseagreen
 }
</style>

