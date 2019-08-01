<template>
  <div class ="mainp">
    <section>
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <h1 class="mt-5">Hacktiv Overflow</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'landing',
  components: {
    },
  methods : {
    goToPost() {
      this.$router.push('/home')
    }
  }
}
</script>
<style scoped>
  .pointer {cursor: pointer;}

  .mainp {
    background: url('http://placehold.it/1920x1080')  no-repeat ;
  }
</style>

