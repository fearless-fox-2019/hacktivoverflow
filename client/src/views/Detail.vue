<template>
<div class="container">
  <a-row>
      <a-col :span="2"></a-col>
      <a-col :span="15">
  <div class="detailPage">
        <a-skeleton id="skeleton" :loading="loading" />
    <detailQuestion v-if="!loading"/>
    <answerlist v-if="!loading"/>
  </div>
    <addingAnswer v-if="isLogin && !loading"/>
    </a-col>
    <a-col :span="7"></a-col>
  </a-row>
</div>
</template>

<script>
import answerlist from '@/components/answerlist.vue'
import detailQuestion from '@/components/detailQuestion.vue'
import addingAnswer from '@/components/addingAnswer.vue'
import ax from '@/axiosApi'
import { mapState } from "vuex";

export default {
  components: {
    answerlist,detailQuestion,addingAnswer
  },
  data(){
    return {
      dataQuestion : {},
      loading: false,
    }
  },
  computed: {
    ...mapState(["answers","isLogin","onequestion"])
  },
  created(){ 
    this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId)
        }, 2000);
    
  }
}
</script>

<style>
/* .container{
  padding-top: 50px;
} */
.detailPage{
  padding-top: 100px;
  /* width: 1000px; */
}
#skeleton ul{
  padding-left: 0;
  margin-left: 0;
}
</style>
