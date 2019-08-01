<template>
  <div id="add-container">
    <form @submit.prevent="addQuestion">
      <b-field label="Title">
        <template slot="label">
          <span class="has-text-primary label" style="margin-top: 0;">Title</span>
        </template>
        <b-input v-model="inputQuestion.title"></b-input>
      </b-field>
      <b-field label="Title">
        <template slot="label">
          <span class="has-text-primary label">Question</span>
        </template>
        <b-input type="textarea" v-model="inputQuestion.content"></b-input>
      </b-field>
      <b-field label="Enter some tags" class="has-text-primary">
        <template slot="label">
          <span class="has-text-primary label">Enter some tags</span>
        </template>
        <b-taginput
            v-model="inputTags"
            :data="filteredTags"
            autocomplete
            allow-new
            field="name"
            icon="label"
            placeholder="Add a tag"
            @typing="getFilteredTags"
            >
        </b-taginput>
      </b-field>
      <b-button type="is-primary" native-type="submit" id="submit" >Submit</b-button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      inputQuestion: {
        title: '',
        content: ''
      },
      inputTags: [],
      filteredTags: this.tags
    }
  },
  methods: {
    addQuestion () {
      let newTag = []
      this.inputTags.forEach(tag => {
        if (tag.name != undefined) {
          newTag.push(tag.name)
        } else {
          newTag.push(tag)
        }
      })
      this.inputQuestion.tags = newTag
      this.$store.dispatch('createQuestion', this.inputQuestion)
        .then(({ data }) => {
          this.$toast.open({ message: 'Question posted !', type: 'is-success' })
          this.$router.push('/')
        })
        .catch(err => {
          this.$toast.open({ message: err.response.data.message, type: 'is-danger' })
        })
    },
    getFilteredTags (text) {
      this.filteredTags = this.tags.filter(option => {
        return option.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
      })
    }
  },
  created () {
    if (!this.isLogin) {
      this.$router.push('/')
      this.$toast.open({ message: 'You have to login first !', type: 'is-danger' })
    } else {
      this.$store.dispatch('fetchTags')
    }
  },
  computed: {
    ...mapState(['isLogin', 'tags'])
  }
}
</script>

<style lang="scss" scoped>
  $primary : #311B92;
  form {
    text-align: center;
  }
  #submit {
    margin-top: 80px;
    font-size: 18px;
  }
  #add-container {
    width: 40%;
    margin: 50px auto;
    border: 5px solid $primary;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    padding: 40px;
  }
  .label {
    font-weight: bold;
    margin-top: 40px;
    font-size: 24px;
  }
</style>
