<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view style="margin-top: 62px;"></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  created () {
    console.log(localStorage.getItem('accessToken'))
    if(localStorage.getItem('accessToken')){
      this.$store.commit('logout')
    }
  }
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
