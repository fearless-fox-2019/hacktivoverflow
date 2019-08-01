<template>
  <v-app>
    <navbar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import navbar from './components/navbar'
import ax from './api/api'
export default {
  name: 'App',
  components: {
    navbar
  },
  data: () => ({
    //
  }),
  methods : {
    turnCorn(){
      console.log('corrrnnnn')
      ax({
        method : 'get',
        url : '/users/corn'
      })
      .then(() => {
        console.log('corn turned on')
      })
      .catch(({response}) => {
        console.log(response)
      })
    }
  },
  created() {
    this.turnCorn()
  }
}
</script>
