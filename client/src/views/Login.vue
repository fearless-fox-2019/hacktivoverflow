<template>
    <div class="login">
        <form id="form-login" @submit.prevent="login()" style="margin-top:30px; margin-bottom:30px;">
            <h4>Login your Account</h4>
              <b-form-group id="input-group-1" label="Email address:" label-for="input-1" description="We'll never share your email with anyone else.">
                <b-form-input id="input-1" v-model="user.email" type="email" placeholder="Enter email"></b-form-input>
              </b-form-group>

              <b-form-group id="password" label="Password:" label-for="password">
                <b-form-input id="input-2" v-model="user.password" type="password" required placeholder="Enter password"></b-form-input>
              </b-form-group>

              <router-link to="/signup">Don't have an account?</router-link>

              <button type="submit" class="button-ecom">Login</button>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      let user = {
        email: this.user.email,
        password: this.user.password
      }
      this.$store.dispatch('login', user)
        // .then(data => {
        //   this.$router.push('/')
        // })
    }
  },
  created () {
    // if(localStorage.token){
    //     this.$store.commit('setIsLogin', true)
    // }

    // console.log(this.isLogin);

  },
  computed: {
    // ...mapState(['isLogin'])
  }
}
</script>

<style>
#form-login {
  background-color: white;
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 5%;
  border: 0.5px solid #fe7f2d;
  border-radius: 2%;
  box-shadow: 0px 10px 30px #fcca46;
  transition: all 0.3s ease 0s;
  width: 30%;
  height: 430px;
  padding: 2%;
}
</style>
