<template>
  <div id="app">
    <Navbar></Navbar>
    <b-row>
      <b-col v-show="page == ''" sm="2" style="padding-right: 150px">
        <Sidebar style="position: fixed; padding-top: 70px;"></Sidebar>
      </b-col>
      <b-col>
        <router-view/>
      </b-col>
    </b-row>
    <Footerr></Footerr>
  </div>
</template>
<script>
import Navbar from './components/Navbar'
import Sidebar from '@/components/Sidebar.vue'
import Footerr from '@/components/Footerr.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Navbar, Sidebar
  },
  computed:{
    ...mapState(['page', ])
  },
  created(){
    this.$store.dispatch('getAllAsk') // manggil actions
    if(localStorage.token){
      console.log('masih ada')
      this.$store.dispatch('userdata', localStorage.token)
      this.$store.commit('isLogin', true)     
      this.$store.dispatch('questionToday')
      this.$store.dispatch('getAllUser')
      this.$store.dispatch('mypost')
    }else{
      this.$router.push('/')
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
