<template>
  <v-dialog v-model="$store.state.modalLogin" persistent max-width="600px">
    <alert />
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Login</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-layout column align-center>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="inputEmail"
              label="Email"
              prepend-icon="mdi-email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="inputPassword"
              label="Password"
              type="password"
              prepend-icon="mdi-key"
              style="width : 500px;"
              required
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" @click="closeLogin">Close</v-btn>
              <v-btn color="blue darken-1" type="submit">submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import ax from '../api/api'
import alert from '../components/alert'
import { mapState } from 'vuex'
export default {
  name: 'login-button',
  components: {
    alert
  },
  data () {
    return {
      dialog: false,
      inputEmail: '',
      inputPassword: ''
    }
  },
  methods: {
    closeLogin () {
      this.$store.commit('SET_MODAL_LOGIN', false)
    },
    login () {
      let dataUser = {
        email: this.inputEmail,
        password: this.inputPassword
      }
      ax({
        method: 'post',
        url: '/users/login',
        data: dataUser
      })
        .then(({ data }) => {
          console.log('sukses login')
          this.$store.commit('SET_CURR_USR_ID', data.id)
          this.$store.commit('SET_SNACKBAR', {
            appearance: true,
            snackbarStatus: 'success',
            alertMessage: 'Successfully login'
          })
          this.$store.commit('SET_MODAL_LOGIN', false)
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          localStorage.setItem('name', data.name)
          this.$store.commit('SET_LOGIN')
        })
        .catch(({ response }) => {
          console.log(response)
          if (response.data.message.includes('email/password invalid')) {
            this.$store.commit('SET_ALERT', {
              appearance: true,
              alertMessage: 'Email or Password Wrong!',
              alertType: 'error',
              alertColor: 'red darken-3'
            })
            setTimeout(() => {
              this.$store.commit('SET_ALERT', { appearance: false })
            }, 2500)
          }
        })
    }
  },
  computed: {
    ...mapState(['modalLogin'])
  }
}
</script>

<style>
</style>
