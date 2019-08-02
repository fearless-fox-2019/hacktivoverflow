<template>
  <b-container>
    <div id="main-container" class="mx-auto">
    <b-card v-for="question in questions" :key="question._id" id="question">
      <b-row>
        <b-col cols="1">
          <b-button class="px-3 py-1" variant="outline-secondary" disabled style="border: 0;">
          <h5>{{ question.votes.length }}</h5>
          <h6>votes</h6>
          </b-button>
          <b-button class="px-2 py-1" variant="outline-success" disabled>
          <h5>3</h5>
          <h6>answers</h6>
          </b-button>
        </b-col>
        <b-col class="ml-4">
          <b-container fluid  style="display: inline-block;">
          <h4 style="display: inline-block;">Q: {{ question.title }}</h4>
          <i style="display: inline-block; font-size: 24px; float: right; color: #cccccc;" class="material-icons">delete</i>
          </b-container>
          <div class="divider"></div>
          <p>
          {{ question.description }}
          </p> <router-link :to="'questions/'+question._id">See More</router-link>
          <div class="mt-2 float-right"><h6>{{ Date(question.createdAt) }} by <b>{{ question.author }}</b></h6></div>
        </b-col>
      </b-row>
    </b-card>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      questions: []
    }
  },
  created () {
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/questions'
    })
    .then(({data}) => {
      this.questions = data
    })
  }
}
</script>


<style>
#main-container {
  border-left: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
}

#question {
  border-left: 0;
  border-right: 0;
  border-top: 0;
}

#button-question {
  padding: 20px 0;
  background-color: #f7f7f7;
}

h4 {
  font-size: 20px !important;
  color: #0078b9;
}

h5 {
  font-size: 16px !important;
  margin: 0 !important;
}

h6 {
  font-size: 12px !important;
}

p {
  font-size: 14px !important;
}

.divider {
  border-bottom: 1px solid #dcdcdc;
  margin-bottom: 16px;
}
</style>
