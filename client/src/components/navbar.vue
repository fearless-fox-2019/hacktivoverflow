<template>
  <div class="navbar-page">
    <b-navbar class="navbar-a">
      <router-link to="/">
        <b-navbar-brand class="navbar-logo">
        <img src="../img/stacklogo.png" class="d-inline-block align-top" alt="logo" width="40" />
        HacktivOverFlow
      </b-navbar-brand>
      </router-link>
        <b-nav-form style="margin-left:10%" >
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" style="width:600px;" v-model="keyword"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <p v-if="isLogin"> Hello, {{user}} </p>
      <!-- <div class="link" style="margin-left:40px;">
        <router-link to='/login'>Login</router-link>
        <router-link to='/login'>Logout</router-link>
      </div>  -->
      <button v-if="isLogin === false" @click="toLoginPage">Login</button>
      <button v-if="isLogin === true" @click="toLogout">Logout</button>  
    </b-navbar>
  </div>
</template>

<script>
import axios from '../config/axios.js'

export default {
  props : ['isLogin', 'user'],
  data() {
    return {
      // user : ""
      keyword : ""
    };
  },
  methods: {
    toLoginPage() {
      this.$router.push("/login");
    },
    toSignUpPage() {
      this.$router.push("/signup");
    },
    toLogout(){
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.$store.commit('setIsLogin', false)
      this.$router.push('/')
    },
    searchQuestion(){
      axios({
        method : `GET`,
        url : `/questions?search=${this.keyword}`
      })
      .then(({data}) => {
        this.$emit('question-search', data)
      })
      .catch(err => {

      })
    }
  }
  
};
</script>

<style>
.navbar-a {
  height: 50px;
  background-color: #c8553d;
}

.form-search {
  width: 400px;
}
.navbar-logo {
  color: #fff;
}
</style>
