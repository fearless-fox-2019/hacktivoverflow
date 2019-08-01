<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/Hacktiv.png"> -->
    <!-- <Navbar></Navbar> -->
    <!-- <b-row> -->
      <b-col sm="10" style="padding-left: 5px;" class="offset"> 
        <b-row v-if="page == ''">
          <b-col cols="9">
            <b-row>
              <b-jumbotron bg-variant="info" text-variant="white" border-variant="white">
                <template slot="header">HacktivOverflow</template>
                <template slot="lead">
                  <img src="https://icons-for-free.com/iconfiles/png/512/svg+overflow+stack+stackoverflow+icon-1320190544408950965.png" alt="" width="100px">
                </template>
                <hr class="my-4">
                <p>
                  It uses utility classes for typography and spacing to space content out within the larger
                  container.
                </p>
                <b-button @click="addQue" variant="outline-danger">Ask Some Question</b-button>
              </b-jumbotron>
            </b-row>
              <b-row v-for="(item, index) in allQuestion" :key="index">
                <b-card>

                <UserQuestion :data="item"></UserQuestion>
                </b-card>
              </b-row>
            <hr>
          </b-col>
          <b-col>
            <QAToday :datas="allToday"></QAToday>
          </b-col>
        </b-row>
        
      </b-col>
    <!-- </b-row> -->
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import UserQuestion from '@/components/UserQuestion.vue'
import QAToday from '@/components/QuestionOfTheDay.vue'
import { mapState } from 'vuex'
export default {
  name: 'landingpage',
  data(){
    return{
      page: '',
      addform: ''
    }
  },
  created(){
    this.$store.dispatch('questionToday')
  },
  computed:{
    ...mapState(['allQuestion', 'allToday'])
  },
  components: {
     Sidebar, UserQuestion, QAToday
  },
  methods:{
    addQue(){
      if(localStorage.token){
       this.$router.push('/question')
      }else{
        Swal.fire('Maaf silahkan login dahulu', 'error')
      }
    }
  }
}
</script>
