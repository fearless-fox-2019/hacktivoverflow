<template>
  <div style='min-height: 100vh;'>
    <NavBar></NavBar>
    <LoginModal></LoginModal>
    <RegisterModal></RegisterModal>
    <AddQuestion></AddQuestion>

    <b-container fluid style="background-color: #E8E8E8; min-height: 100vh">
    <router-view/>

    </b-container>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
// import LoginModal from './components/LoginModal'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/Register'
import AddQuestion from './components/AddQuestion'
export default {
  components: {
    NavBar,
    LoginModal,
    RegisterModal,
    AddQuestion
  },
  methods: {
    
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('LOGIN_TRUE')
    } else {
      this.$router.push('/')
      // this.$store.commit('LOG')
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
body,html{
  height: 100%;
}
</style>
