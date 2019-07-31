<template>
  <div class="home">
      <navBar></navBar>
      <!-- Searchbar and Data User -->
      <div class="tile is-ancestor container" id="bar-container" style="height: 200px">
        <div class="tile is-parent is-8 ">
          <article class="tile is-child box ">
            <p class="subtitle">Search some question</p>
            <div class="content is-paddingless">
              <form @submit.prevent="searchQuestion">
                <b-field style="margin-top: -10px">
                    <b-input placeholder="Your Question..."
                        v-model="keyword"
                        type="search"
                        icon-pack="fas"
                        icon="search"
                        rounded
                        >
                    </b-input>
                </b-field>
              </form>
              <p>Or Ask new question</p>
              <a @click="toAdd" class="button is-success is-focused is-small" style="margin-top: -10px">New Question</a>
            </div>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child box">
            <p class="subtitle">Your Post</p>
            <div class="content">
              <div class="columns">
                <div class="column">
                  <p>My Questions</p>
                  <p @click="toMyQuestion" id="my-question">{{myQuestion.length}}</p>
                </div>
                <div class="column">
                  <p>My Answers</p>
                  <p>{{myAnswer.length}}</p>
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
            <div v-for="question in allQuestion" :key="question._id">
              <cardQuestion :question="question"></cardQuestion>
            </div>
          </div>
        </div>
        <div class="column  is-narrow">
          <div class="card" style="width: 300px;">
              <header class="card-header">
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
                    <div class="tags">
                        <span v-for="(tag, index) in userTags" 
                            :key="index"
                            @click.prevent="searchTag(tag)" 
                            class="tag is-danger">
                            <a style="color: white">{{tag}}</a>
                        </span>
                    </div>
                  </div>
                    <div v-if="editTag">
                      <b-taginput 
                        v-model="userTags"
                        ellipsis
                        icon="label"
                        placeholder="Add a tag"
                        style="margin-bottom: 5px"
                      >
                    </b-taginput>

                    <b-button @click="updateTag" type="is-warning is-small">Save</b-button>

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
      editTag: false


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
        this.editTag= true
      },
      updateTag(){

        this.editTag=false
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
   background-color: black;
   margin-left: 3%
 }

 #tag:hover{
   cursor: pointer
 }

 #my-question:hover{
   cursor: pointer
 }
</style>

