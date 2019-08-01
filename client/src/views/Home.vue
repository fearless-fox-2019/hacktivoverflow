<template>
  <div class="home columns">
    <div class="column is-8" id="post-container">
      <div id="topbar">
        <div id="search">
          <b-input placeholder="Search..."
            type="search"
            v-model="searchInput"
            icon="magnify" rounded>
          </b-input>
        </div>
        <div id="question-options">
          <p :class="[ questionState === 'all' ? 'option-button-active' : 'option-button']" @click="openAllQuestions">All Questions</p>
          <p :class="[ questionState === 'my' ? 'option-button-active' : 'option-button']" style="margin-left: 20px;" @click="openMyQuestions">My Questions</p>
        </div>
        <div id="sort-option">
          <b-select placeholder="new" v-model="sortState">
            <option
              v-for="(option, index) in sortOption"
              :value="option"
              :key="index">
              {{ option }}
            </option>
          </b-select>
          <b-button icon-right="angle-down" icon-pack="fas" @click="open" style="margin-left:20px;">Tags</b-button>
        </div>
        <div id="list-tags" v-if="openTag">
          <p v-for="tag in tags" :key="tag._id" class="tag-item" @click="watchTag(tag.name)"> {{tag.name}}</p>
        </div>
      </div>
      <div >
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="true"></b-loading>
        <Post v-for="question in filteredQuestions"
        :key="question._id"
        :question="question"
        :state="questionState"
        @refresh="openMyQuestions"
        />
      </div>
    </div>
    <div class="column is-4 sidebar bg-sidebar">
      <Sidebar />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar.vue'
import Post from '@/components/Post.vue'
export default {
  name: 'home',
  data () {
    return {
      isLoading: true,
      searchInput: '',
      questionState: 'all',
      sortState : localStorage.getItem('sort') || 'new',
      questions : [], 
      sortOption : ['top', 'new'],
      openTag : false
    }
  },
  components: {
    Post,
    Sidebar
  },
  created () {
    this.$store.dispatch('fetchQuestions')
    .then(({ data }) => {
      this.$store.commit('STOREQUESTIONS', data)
      !localStorage.getItem('sort') ? localStorage.setItem('sort', 'new') : ''
      this.isLoading = false
    })
    this.$store.dispatch('fetchTags')
  },
  computed: {
    filteredQuestions () {
      let sort = this.sortState
      let watch = this.watchTags
      this.questions = this.$store.getters[sort](this.questionState)
      if(watch.length > 0 ) {
        this.questions = this.questions.filter(question => {
          let found = false
          for(let i = 0; i < watch.length; i++ ) {
            if(question.tags.filter(tag => tag.name == watch[i]).length > 0) {
              found = true
            }
          }
          return found
        })
      }
      return this.questions.filter(question => {
        return question.title.toLowerCase().includes(this.searchInput.toLowerCase())
      })
    },
    ...mapState([ 'isLogin', 'watchTags', 'tags']),
    ...mapGetters(['myQuestion'])
  },
  methods: {
    openMyQuestions () {
      if (!this.isLogin) {
        this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
      } else {
        this.questions = this.myQuestion
        this.questionState = 'my'
      }
    },
    openAllQuestions () {
      this.isLoading = true
      this.$store.dispatch('fetchQuestions')
        .then(({ data }) => {
          this.$store.commit('STOREQUESTIONS', data)
          this.isLoading = false
          this.questionState = 'all'
        })
    },
    watchTag(name) {
      this.$store.commit('PUSHWATCHTAGS', name)
    },
    open() {
      this.openTag = this.openTag ? false : true
    }
  },
   watch : {
    isLogin() {
      if(!this.isLogin) {
        this.questionState = 'all'
      }
    },
    sortState() {
      localStorage.setItem('sort', this.sortState)
    }
  }
}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #question-options {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  
  .bg-sidebar {
    background-image: url('https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/newspaper_k72w.svg');
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: right 50% bottom 2em;
    background-color: #E8EAF6;
  }
  .option-button {
    transition-duration: 0.3s;
    border: 1px solid $primary;
    border-radius: 10px;
    padding: 6px 15px;
    font-size: 16px;

  }
  .option-button:hover{
    transition-duration: 0.3s;
    cursor: pointer;
    background-color: #311B92;
    color: white;
  }
  .option-button-active {
    transition-duration: 0.3s;
    border: 1px solid $primary;
    border-radius: 10px;
    padding: 6px 15px;
    font-size: 16px;
    background-color: #311B92;
    color: white;
  }
  #search {
    width: 50%;
    margin: 0 auto;
  }
  .home {
    height: 100%;
    padding: 12px;
  }
  .sidebar {
    height: 100%;
    background-color: #E8EAF6;
    border-right: 1px solid rgba(0, 0, 0, 0.404);
    border-left: 1px solid rgba(0, 0, 0, 0.404);
    z-index: -99999;
  }
  #post-container {
    height: 100%;
    overflow-y: auto;
  }
  #post-container::-webkit-scrollbar {
    width: 10px;
  }

  #post-container::-webkit-scrollbar-track {
    background: #f1f1f1
  }

  #post-container::-webkit-scrollbar-thumb {
    background: $primary  ;
  }

  #sort-option {
    display: flex;
  }

  #list-tags {
    margin: 1em;
    border: 1.5px solid #311B92;
    padding: 15px;
    border-radius: 15px;
    display: flex;
  }

  .tag-item {
    margin-left: 10px;
    color: white;
    background-color: #311B92;
    padding: 2px 10px;
    font-size: 12px;
    border-radius: 5px;
  }
  .tag-item:first-child {
    margin-left: 0;
  }

  .tag-item:hover {
    cursor: pointer;
  }
</style>
