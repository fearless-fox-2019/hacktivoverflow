<template>
    <div>
        <navbarLanding
          @changePage="changePage"
        > </navbarLanding>

        <!-- Sign In Section -->
        <div v-if="page === 'login'" class="columns is-mobile" style="margin-top: 7%">
          <div class="column is-half is-offset-one-quarter">
            <h3 class="title is-3">Sign In to H8Overflow</h3><br>
            <g-signin-button
                    class="button"
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    <i class="fab fa-google" style="color: red"><span style="color: black"> Sign in with Google</span></i>
            </g-signin-button><hr>

              <form @submit.prevent="login" style="width: 400px; margin-left: 18%; margin-bottom: 20px">
                <b-field class="has-text-left" label="Email">
                  <b-input v-model="user.email" placeholder="Email" rounded></b-input>
                </b-field>
                <b-field class="has-text-left" label="Password">
                  <b-input v-model="user.password" type="password"  password-reveal rounded></b-input>
                </b-field><br>
                  <input type="submit" value="Sign In" class="button is-success is-outlined is-rounded">
              </form>
              <p class="help subtitle is-6">Don't have account? <span @click="changePage('register')" style="font-weight:bold">Sign Up</span></p>
          </div>
      </div>

      <!-- Sign Up Section -->
      <div v-if="page === 'register'" class="columns is-mobile" style="margin-top: 5%">
          <div class="column is-half is-offset-one-quarter">
            <h3 class="title is-5">Create your Stack Overflow account.</h3>
            <h3 class="title is-5" style="margin-top: -10px">  It’s free and only takes a minute.</h3>

            <g-signin-button
                    class="button"
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    <i class="fab fa-google" style="color: red"><span style="color: black"> Sign up with Google</span></i>
            </g-signin-button><hr>

              <form @submit.prevent="register" style="width: 400px; margin-left: 18%; margin-bottom: 20px">
                <b-field class="has-text-left" label="Name">
                  <b-input v-model="newUser.name" placeholder="Name" rounded></b-input>
                </b-field>
                <div>
                  <b-field class="has-text-left" label="Email">
                    <b-input v-model="newUser.email" type="text" placeholder="Email" rounded validate></b-input>
                  </b-field>
                </div>
                <b-field class="has-text-left" label="Password">
                  <b-input v-model="newUser.password" type="password" placeholder="Password" password-reveal rounded></b-input>
                </b-field>
                <b-field class="has-text-left" label="Tags that interest you"></b-field>
                  <p class="help">Picking tags will help us show you more relevant questions and answers </p>
                  <b-taginput
                      v-model="newUser.userTags"
                      ellipsis
                      icon="label"
                      placeholder="Add a tag"
                      rounded
                      >
                  </b-taginput>

                <br>
                  <input type="submit" value="Sign Up" class="button is-success is-outlined is-rounded">
              </form>
              <p class="help subtitle is-6">Already have account? <span @click="changePage('login')" style="font-weight:bold" >Sign In</span></p>

          </div>
      </div>

    </div>
</template>

<script>
import axios from '../config/api.js'
import navbarLanding from '@/components/navbarLanding'

export default {
  name: 'login',
  components: {
    navbarLanding
  },
  data () {
    return {
      googleSignInParams: {
        client_id: '917741793186-6b7nmc68c5eqbhnh11e2chc6m0d9gfd4.apps.googleusercontent.com'

      },
      page: 'login',
      user: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: '',
        userTags: []
      }
    }
  },
  methods: {

    changePage (value) {
      this.page = value
    },
    login () {
      axios({
        url: '/users/login',
        method: 'post',
        data: this.user
      })
        .then(({ data }) => {
          console.log(data)
          this.user.email = ''
          this.user.password = ''

          localStorage.setItem('name', data.name)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('token', data.token)
          this.$router.push('/home')
        })
        .catch(err => {
          console.log('error login')
          console.log(err)
          this.$toast.open({
            message: `Login Failed! Wrong email/password`,
            type: 'is-danger'
          })
        })
    },
    register () {
      axios({
        url: '/users/register',
        method: 'post',
        data: this.newUser
      })
        .then(({ data }) => {
          this.user.email = this.newUser.email
          this.user.password = this.newUser.password
          this.login()
        })
        .catch(err => {
          console.log('error register')
          console.log(err)
        })
    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile() // etc etc
      const idToken = googleUser.getAuthResponse().id_token
      axios({
        url: `/users/loginGoogle`,
        method: 'post',
        data: {
          idToken: idToken
        }
      })
        .then(({ data }) => {
          this.user.email = ''
          this.user.password = ''

          localStorage.setItem('name', data.name)
          localStorage.setItem('userId', data.userId)
          localStorage.setItem('token', data.token)
          this.$router.push('/home')
        })
        .catch((err) => {
          console.log('masuk error login')
          console.log(err, 'ini errroorrrr')
        })
    },
    onSignInError (error) {
      console.log('error login google')
      console.log(error)
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>
