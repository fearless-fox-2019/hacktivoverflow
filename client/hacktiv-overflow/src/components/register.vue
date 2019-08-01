<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <alert />
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Register</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-card-text>
          <v-layout column align-center>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="inputName"
                label="Name"
                prepend-icon="mdi-account-circle"
                style="width : 500px;"
                required
              ></v-text-field>
              <v-text-field v-model="inputEmail" label="Email" prepend-icon="mdi-email" required></v-text-field>
              <v-text-field
                v-model="inputPassword"
                label="Password"
                prepend-icon="mdi-key"
                type="password"
                required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" type="submit">Submit</v-btn>
              </v-card-actions>
            </v-form>
          </v-layout>
        </v-card-text>
      </v-card-text>
    </v-card>
    <v-layout justify-center>
      <v-dialog v-model="confirmDialog" persistent max-width="320">
        <v-card>
          <v-card-title class="headline">Successfully Registered, Proceed to Login?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="confirmDialog = false">Close</v-btn>
            <v-btn color="green darken-1" text @click="openLogin">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-dialog>
</template>

<script>
import alert from '../components/alert'
import ax from '../api/api'
import { mapState } from 'vuex'
export default {
  name: 'register-button',
  components: {
    alert
  },
  data () {
    return {
      dialog: false,
      inputName: '',
      inputEmail: '',
      inputPassword: '',
      confirmDialog: false
    }
  },
  methods: {
    register () {
      let userData = {
        name: this.inputName,
        email: this.inputEmail,
        password: this.inputPassword
      }
      ax({
        method: 'post',
        url: '/users/register',
        data: userData
      })
        .then(({ data }) => {
          console.log('sukses register')
          this.confirmDialog = true
          this.dialog = false
        })
        .catch(({ response }) => {
          console.log(response)
          if (response.data.message.includes('email has been registered!')) {
            this.$store.commit('SET_ALERT', {
              appearance: true,
              alertMessage: 'email has been registered!',
              alertType: 'error',
              alertColor: 'red darken-3'
            })
            setTimeout(() => {
              this.$store.commit('SET_ALERT', { appearance: false })
            }, 2500)
          } else if (response.data.message.includes('email format wrong!')) {
            this.$store.commit('SET_ALERT', {
              appearance: true,
              alertMessage: 'Email Format Wrong!',
              alertType: 'error',
              alertColor: 'red darken-3'
            })
            setTimeout(() => {
              this.$store.commit('SET_ALERT', { appearance: false })
            }, 2500)
          } else if (
            response.data.message.includes(
              'password length must be more than 6 characters!'
            )
          ) {
            this.$store.commit('SET_ALERT', {
              appearance: true,
              alertMessage: 'password length must be more than 6 characters!',
              alertType: 'error',
              alertColor: 'red darken-3'
            })
            setTimeout(() => {
              this.$store.commit('SET_ALERT', { appearance: false })
            }, 2500)
          }
        })
    },
    openLogin () {
      this.confirmDialog = false
      this.$store.commit('SET_MODAL_LOGIN', true)
      this.inputName = ''
      this.inputEmail = ''
      this.inputPassword = ''
    }
  },
  computed: {
    ...mapState(['alert', 'alertMessage'])
  }
}
</script>

<style>
</style>
