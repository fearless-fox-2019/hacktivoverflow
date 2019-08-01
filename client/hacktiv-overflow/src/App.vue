<template>
  <v-app>
    <navbar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import navbar from './components/navbar'

export default {
  name: 'App',
  components: {
    navbar
  },
  data: () => ({
    //
  })
}
</script>
