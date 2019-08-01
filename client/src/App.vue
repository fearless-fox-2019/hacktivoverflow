<template>
  <div id="app">
    <div id="page-container">
      <div id="content-wrap">
        <Navbar/>
      </div>
    </div>



    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  },
  mounted() {
    this.$store.dispatch('getQuestion');
    localStorage.token ? this.checkLogin() : false;
  },
  methods: {
    checkLogin() {
      this.$store.dispatch('setLoggedInUser')
      .then(() => {
        if(!this.$store.getters.error) {
          this.$store.dispatch('fetchMyQuestions')
        }
      })
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
