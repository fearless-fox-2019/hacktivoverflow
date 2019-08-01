<template>
  <v-snackbar class="mt-1" v-model="$store.state.snackbarAppearance" :timeout="snackbarTimeout" top :color="snackbarStatus">{{alertMessage}}</v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'snackbar',
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['snackbarAppearance', 'snackbarStatus', 'alertMessage', 'snackbarTimeout'])
  }
}
</script>

<style>
</style>
