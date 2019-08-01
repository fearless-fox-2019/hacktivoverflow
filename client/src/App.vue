<template>
  <div id="app">
    <div id="nav">
      <navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'


export default {
  components: {
    navbar
  },
  created(){
    console.log(this.$store.state.isLogin)
    this.$store.commit('checkLocal')
    if(!this.$store.state.isLogin){
      this.$router.push('/')
    }
  }  
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
