<template>
  <v-app-bar app clipped-left color="light-blue darken-1" style="position : fixed;">
    <v-toolbar-title id="title" @click="toHome" style="cursor : pointer">Stacker Overflow</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <loginButton v-if="!isLogin" @click="openLogin" />
      <registerButton v-if="!isLogin" />
      <v-btn v-if="isLogin" text @click="logout">LOGOUT</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import loginButton from './loginButton'
import registerButton from './register'
import { mapState } from 'vuex'
export default {
  name: 'navbar',
  components: {
    loginButton,
    registerButton
  },
  data () {
    return {
      drawer: null
    }
  },
  methods: {
    openLogin () {
      this.$store.commit('SET_MODAL_LOGIN', true)
    },
    logout () {
      localStorage.clear()
      this.$store.commit('SET_LOGIN')
      this.$store.commit('SET_CURR_USR_ID', '')
      this.$router.push('/')
      this.$store.commit('SET_SNACKBAR', {
        appearance: true,
        snackbarStatus: 'warning',
        alertMessage: 'Successfully logout'
      })
    },
    toHome () {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState(['isLogin'])
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Teko&display=swap");
#title {
  font-family: "Teko", sans-serif;
  font-size: 2.5em;
}
#navbar-content {
  display: flex;
  justify-content: center;
  align-content: space-between;
}
</style>
