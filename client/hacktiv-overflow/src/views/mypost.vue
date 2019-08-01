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
            <question :postData="myPost" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import snackbar from '../components/snackbar'
import sidenav from '../components/sidenav'
import question from '../components/question-card'
import { mapState } from 'vuex'
export default {
  name: 'mypost',
  components: {
    snackbar,
    sidenav,
    question
  },
  created () {
    console.log('asdsadsadsa')
    this.$store.dispatch('getMyPosts')
    console.log(this.currUserId, 'ini curr user id')
    this.$store.commit('SET_LOGIN')
    this.$store.commit('SET_CARD_TITLE', 'Your Questions')
  },
  data () {
    return {}
  },
  computed: {
    ...mapState(['isLogin', 'currUserId', 'myPost'])
  },
  methods: {

  }
}
</script>

<style>
</style>
