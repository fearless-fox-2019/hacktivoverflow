<template>
  <div id="post-card">
    <div id="arrow-vote">
      <div @click="upvote">
        <b-icon
            pack="fas"
            icon="arrow-up"
            class="arrow"
            :class="{'arrow-upvoted' : upvoted}"
            >
        </b-icon>
      </div>
      <div id="score">{{question.upvote.length - question.downvote.length}}</div>
      <div @click="downvote">
        <b-icon
            pack="fas"
            icon="arrow-down"
            class="arrow"
            :class="{'arrow-downvoted' : downvoted}"
            @click="downvote"
            >
        </b-icon>
      </div>
    </div>
    <div id="question">
      <p id="poster">Posted by: {{question.user.username}} at {{question.createdAt | moment("from", "now")}}, {{question.createdAt | moment("dddd, MMMM Do YYYY")}}</p>
      <p id="post"  @click="toDetail">{{question.title}}</p>
      <div id="option-container" v-if="state === 'my'">
        <p class="option" @click="deleteThis(question._id)">delete</p>
        <p class="option" style="margin-left: 15px;" @click="openForm">edit</p>
      </div>
      <div id="tag-list">
        <p v-for="tag in question.tags" :key="tag._id" class="tag-item" @click="watchTag(tag.name)"> {{tag.name}}</p>
      </div>
    </div>
    <b-modal :active.sync="isComponentModalActive"
      has-modal-card full-screen :can-cancel="false">
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Edit from '@/components/Edit.vue'
export default {
  name: 'post',
  props: ['question', 'state'],
  data () {
    return {
      isComponentModalActive: false,
      upvoted: false,
      downvoted: false
    }
  },
  created () {
    if (this.question.upvote.includes(this.loggedUser._id)) {
      this.upvoted = true
    }
    if (this.question.downvote.includes(this.loggedUser._id)) {
      this.downvoted = true
    }
  },
  computed: {
    ...mapState(['loggedUser', 'questions', 'isLogin'])
  },
  methods: {
    toDetail () {
      let id = this.question._id
      this.$router.push(`/question/${id}`)
      this.$store.commit('STOREDETAIL', id)
    },
    deleteThis (id) {
      this.$dialog.confirm({
        message: 'Delete this post ?',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.$store.dispatch('deleteQuestion', id)
            .then(({ data }) => {
              this.$toast.open({ message: 'Post deleted !', type: 'is-success' })
              return this.$store.dispatch('fetchQuestions')
            })
            .then(({ data }) => {
              this.$store.commit('STOREQUESTIONS', data)
            })
            .catch(err => {
              this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
            })
        }
      })
    },
    openForm (id) {
      this.$modal.open({
        parent: this,
        component: Edit,
        hasModalCard: true,
        props: {
          question: this.question,
          state: 'question'
        }
      })
    },
    upvote () {
      console.log(this.upvoted, 'SEBELUM')
      if (!this.isLogin) {
        this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
      } else {
        let userId = this.loggedUser._id
        if (!this.upvoted) {
          this.upvoted = true
          console.log(this.upvoted, 'SESUDAH')
          this.question.upvote.push(userId)
          if (this.downvoted) {
            this.downvoted = false
            let index = this.question.downvote.indexOf(userId)
            this.question.downvote.splice(index, 1)
          }
        } else {
          this.upvoted = false
          console.log(this.upvoted, 'SESUDAH')
          let index = this.question.upvote.indexOf(userId)
          this.question.upvote.splice(index, 1)
        }
        this.$store.dispatch('voteUpdateQuestion', this.question)
          .then(result => {
            this.downvoted = false
            console.log('berhasil upvote')
          })
          .catch(err => {
            this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
          })
      }
    },
    downvote () {
      if (!this.isLogin) {
        this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
      } else {
        let userId = this.loggedUser._id
        if (!this.downvoted) {
          this.downvoted = true
          this.question.downvote.push(userId)
          if (this.upvoted) {
            this.upvoted = false
            let index = this.question.upvote.indexOf(userId)
            this.question.upvote.splice(index, 1)
          }
        } else {
          this.downvoted = false
          let index = this.question.downvote.indexOf(userId)
          this.question.downvote.splice(index, 1)
        }
        this.$store.dispatch('voteUpdateQuestion', this.question)
          .then(result => {
            this.upvoted = false
            console.log(result)
            console.log('berhasil downvote')
          })
          .catch(err => {
            this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
          })
      }
    },
    watchTag (name) {
      this.$store.commit('PUSHWATCHTAGS', name)
    }
  },
  components: {

  },
  watch: {
    isLogin () {
      if (!this.isLogin) {
        this.upvoted = false
        this.downvoted = false
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #option-container {
    display: flex;
  }
  .option {
    margin: 0;
    margin-left: 5px;
    font-size: 14px;
    color: $primary;
  }
  .option:hover{
    cursor: pointer;
    color: black;
  }
  #post-card {
    width: 100%;
    border-bottom: 2px solid rgba(49, 27, 146, 0.603);
    // height: 120px;
    padding: 10px 20px;
    display: flex;
    margin: 10px auto;
    // align-items: center;
  }

  #arrow-vote {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    color: black;
  }

  #question {
    margin: auto 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .arrow:hover{
    cursor: pointer;
  }

  .arrow-upvoted {
    // background-color: rgba(0, 0, 0, 0.048);
    // padding: 5px;
    color: #651FFF;
  }
  .arrow-downvoted {
    color: #FF1744;
  }

  #poster {
    font-size: 12px;
    // align-self: flex-end;
    color: $primary;
  }
  #post {
    border: 1px solid $primary;
    border-radius: 8px;
    padding: 15px;
  }
  #post:hover{
    cursor: pointer;
    background-color: rgba(49, 27, 146, 0.082);
  }
  #tag-list {
    display: flex;
    // flex-direction: row;
    margin: 10px 0;
    width: 100%;
  }
  .tag-item:hover {
    cursor: pointer;
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
</style>
