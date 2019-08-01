<template>
  <v-alert
    :value="alert"
    :type="alertType"
    :color="alertColor"
    transition="scale-transition"
    class="font-weight-bold title"
  >{{ alertMessage }}</v-alert>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['alert', 'alertMessage', 'alertType', 'alertColor'])
  }
}
</script>

<style>
</style>
