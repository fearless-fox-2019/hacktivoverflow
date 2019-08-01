<template>
  <div id="app" :class="[{ 'landing-bg' : $router.currentRoute.name == 'login' || $router.currentRoute.name == 'register' }, {'submit-page' : $router.currentRoute.name == 'submit'}]" class="default-bg">
    <div id="nav">
      <div id="first-item">
        <p id="judul">Flow</p>
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/submit">Ask a question</router-link>
      </div>

      <div id="nav-login-register" class="second-item" v-if="!isLogin">
        <router-link class="link" to="/login">Login</router-link>
        <router-link class="link" to="/register">Register</router-link>
      </div>
      <div v-else class="second-item">
        <p class="item">{{loggedUser.username}}</p>
        <p class="item" id="logout" @click="logout">Log Out</p>
      </div>
    </div>
    <router-view class="animated fadeIn"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('updateLoginStatus', true)
      this.$store.commit('INPUTLOGGEDUSER', JSON.parse(localStorage.getItem('user')))
      this.$toast.open({ message: 'You logged in !', type: 'is-success' })
    }
    this.$store.dispatch('fetchCron')
  },
  computed: {
    ...mapState(['isLogin', 'loggedUser'])
  },
  methods: {
    logout () {
      this.$store.commit('updateLoginStatus', false)
      localStorage.clear()
      this.$router.push('/')
      this.$toast.open({ message: 'Successfully logged out', type: 'is-success' })
    }
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');
  #app, body, html { margin: 0; width: 100%; height: 100%; padding: 0; overflow-y: hidden; overflow-x: hidden; }
  $primary: #311B92;
  p {
    margin: 0;
  }
  .default-bg {
    background-color: rgba(232, 234, 246, 0);
  }
  .landing-bg {
    background-image: url('https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/online_discussion_5wgl.svg');

    padding: 100px;

    background-size: 40%;
    background-repeat: no-repeat;
    background-position: 50em;
    background-color: #E8EAF6;
  }

  .submit-page {
    background-image: url('https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/update_uxn2.svg');

    padding: 100px;

    background-size: 40%;
    background-repeat: repeat-x;
    background-position: 8%;
    background-color: #E8EAF6;
  }

  #user-control {
    margin-left: 30px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #nav {
    display: flex;
    border-top: 4px solid #311B92;
    border-bottom: 1px solid rgba(0, 0, 0, 0.404);
    align-items: center;
    justify-items: stretch;
    justify-content: space-between;
    background-color: #FAFAFB;
    padding: 10px 20px;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.027), 0 6px 8px 0 rgba(0, 0, 0, 0.103);
    z-index: 99999;
    width: 100%;
  }

  #first-item {
    display: flex;
    align-items: center;
    // width: 20%;
  }

  .second-item {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  #logout:hover{
    cursor: pointer;
    color: rgba(255, 0, 0, 0.473);
  }
  #logout {
    margin-left: 30px;
  }
  .item:hover {
    cursor: pointer;
  }
  .item {
    font-weight: bold;
  }

  .link {
    font-weight: bold;
    color: black;
    text-decoration: none;
    margin-left: 20px;

  }

  #nav a.router-link-exact-active {
    color: $primary;
  }

  #judul {
    font-family: 'Permanent Marker', cursive;
    font-size: 24px;
    color: #311B92;
    background-color: rgba(209, 196, 233, 0.295);
    padding: 0 17px;
    border-radius: 8px;
    border: 1.5px solid #311B92;
  }
</style>
