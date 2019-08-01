<template>
  <v-app id="keep">
    <snackbar />
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center row wrap>
          <v-flex xs3>
            <sidenav style="position : fixed; margin-top: 60px;" />
          </v-flex>
          <v-flex xs9>
            <question :postData="allPosts" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import sidenav from '../components/sidenav'
import snackbar from '../components/snackbar'
import question from '../components/question-card'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    question,
    snackbar,
    sidenav
  },
  created () {
    console.log('asdsadsadsa')
    this.$store.dispatch('getAllQuestions')
    console.log(this.currUserId, 'ini curr user id')
    this.$store.commit('SET_LOGIN')
    this.$store.commit('SET_CURR_USR_ID', localStorage.id)
    this.$store.commit('SET_CARD_TITLE', 'All Questions')
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['isLogin', 'currUserId', 'allPosts'])
  }
}
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
