<template>
    <div>
        <div class="eQuestion text-left">
          <a-tabs defaultActiveKey="1">
    <a-tab-pane key="1">
      <span slot="tab">
        <a-icon type="global" />
        Latest Question
      </span>
        <eachquestion v-for="question in questions" :key="question._id" :dataquestion="question"/>
    </a-tab-pane>
    <a-tab-pane key="2">
      <span slot="tab">
        <a-icon type="heart" theme="filled" />
        Popular Question
      </span>
      <eachquestion v-for="question in populars" :key="question._id" :dataquestion="question"/>
    </a-tab-pane>
  </a-tabs>
        </div>
    </div>
</template>

<script>
import ax from "@/axiosApi";
import eachquestion from '@/components/eachquestion.vue'
export default {
  name: 'listQ',
  components: {
    eachquestion
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
  data(){
    return {
      populars : []
    }
  },
  created () {
    this.$store.dispatch('GETQUESTION')
    this.getPopular()
  },
  methods: {
    getPopular(){
      ax.get(`/questions/all?popular=1`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        this.populars = data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.eQuestion{
    padding: 30px;
}
</style>
