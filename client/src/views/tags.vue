<template>
  <div class="tag-page">
    <b-container fluid>
      <b-row>
        <b-col cols="2">
          <sidebar />
        </b-col>
        <b-col cols="7">
        <b-row>
            <div class="tag-body-page">
                <h3>Tags</h3>
                <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
                <div class="form-search">
                    <form @submit.prevent="searchTags">
                        <b-form-group
                        id="input-group-1"
                        label="Tags"
                        label-for="input-1"
                        description="input tag you want to search"
                        >
                        <b-form-input
                            id="input-1"
                            v-model="keyword"
                            type="text"
                            required
                            placeholder="Enter tag"
                        ></b-form-input>
                        <b-button style="margin-left : 83%; margin-top:10px;" type="submit">Search</b-button>
                        </b-form-group>
                    </form>
                </div>
            </div>
        </b-row>
        <b-row>
            <div class="list-question-tag" v-if="listQuestion.length > 0">
                <list-question v-for="question in listQuestion" :key="question._id" :question="question"></list-question>
            </div>
        </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import sidebar from '../components/sidebar.vue'
import listQuestion from '../components/listQuestion.vue'
import axios from '../config/axios.js'

export default {
  components: {
    sidebar,
    listQuestion
  },
  data () {
    return {
      keyword: '',
      listQuestion: [],
      isLoading: false
    }
  },
  methods: {
    searchTags () {
      console.log('trigger searchtag method')

      isLoading : true
      axios({
        method: `GET`,
        url: `questions?tags=${this.keyword}`
      })
        .then(({ data }) => {
          isLoading : false
          console.log(data, 'foundeddddd')
          this.listQuestion = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
.form-search {
  margin-top: 40px;
  width : 400px;
}
.tag-body-page{
    margin-top : 40px;
}
</style>
