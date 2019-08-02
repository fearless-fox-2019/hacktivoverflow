<template>
  <div id="app">
    <!-- <div id="nav">

      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <navbar-page :isLogin="isLogin" :user="user" @question-search="questionSearch"/>
    <router-view/>
    <footer-page class="footer-home"></footer-page>
  </div>
</template>

<script>
import navbarPage from '@/components/navbar'
import { mapState } from 'vuex'
import footerPage from '@/components/footer.vue'

export default {
  // name : 'navbar'
  components: {
    navbarPage,
    footerPage
  },
  data () {
    return {
      user: '',
      listQuestion: []
    }
  },
  methods: {
    questionSearch (value) {
      this.listQuestion = value
    }
  },
  created () {
    if (localStorage.token) {
      console.log(localStorage.email)
      this.user = localStorage.email
      this.$store.commit('setIsLogin', true)
    }
    console.log(this.isLogin)
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Alegreya+Sans&display=swap');

#app {
  font-family: 'Alegreya Sans', sans-serif;
  font-size : 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
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
