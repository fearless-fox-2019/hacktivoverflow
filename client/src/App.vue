<template>
  <div id="app">
    <div id="nav" class="row d-flex justify-content-between align-items-center border-bottom border-dark">
      <div class="col-sm-3 d-flex flex-row">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <p class="heading">Mini Stack Overflow</p>
      </div>
      <div class="col-sm-6 border">
        <router-link to="/">Home</router-link> |
        <!-- <router-link to="/about">About</router-link> | -->
        <router-link to="/myPost">My Post</router-link> |
        <router-link to="/createPost">Create Post</router-link>
      </div>
      <div class="col-sm-3 d-flex flex-row-reverse">
        <a v-if="$store.state.isLogin" @click="logoutUser" variant="primary" class="m-2">LOGOUT</a>
        <a v-if="!$store.state.isLogin" v-b-modal.login variant="outline-primary" class="m-2">LOGIN</a>
        <a v-if="!$store.state.isLogin" v-b-modal.register variant="primary" class="m-2">REGISTER</a>
        
        <b-modal v-if="!$store.state.isLogin" id="login" centered title="Login" hide-footer>
          <FormLogin></FormLogin>
        </b-modal>
        
        <b-modal v-if="!$store.state.isLogin" id="register" centered title="Register" hide-footer>
          <FormRegister></FormRegister>
        </b-modal>
      </div>
    </div>

    <router-view/>
  </div>
</template>

<script>
import FormRegister from '@/components/FormRegister.vue'
import FormLogin from '@/components/FormLogin.vue'

export default {
  components: {
    FormRegister,FormLogin
  },
  methods: {
    logoutUser(){
      localStorage.clear()
      Swal.fire('Logged out sucessfully')
      this.$store.commit('changeLogin', false)
    }
  },
  created(){
    if (localStorage.getItem('token')){
      this.$store.commit('changeLogin', true)
    }
  }
}
</script>


<style>
.heading{
  font-family: 'Anton', sans-serif;
}
.paragraph{
  font-family: 'Libre Franklin', sans-serif;
}
a{
  cursor: pointer;
}
img{
  height: 50px;
  width: 50px
}
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
