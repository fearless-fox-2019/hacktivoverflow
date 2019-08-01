<template>
<v-container>
  <h1>DEVELOPER JOB FOR YOU</h1>
<v-layout wrap>
  <v-card
    class="mx-auto"
     v-for="(job,i) in $store.state.jobs"
    :key="i"
    style="margin:5px"
  >
    <v-img
      class="white--text"
      height="200px"
      :src="(job.company_logo) ? job.company_logo : 'https://bulma.io/images/placeholders/128x128.png'"
      lazy-src="https://bulma.io/images/placeholders/128x128.png"
      contain
    >
      <v-card-title class="align-end fill-height">{{ job.company }}</v-card-title>
    </v-img>

    <v-card-text>
      <span v-html="job.description" class="text--primary"></span>
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="orange"
      >
        Share
      </v-btn>
      <v-btn
        text
        color="orange"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</v-layout>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
