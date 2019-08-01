<template>
  <div class="landing" v-if="!$store.state.isLogin">
    <section class="hero is-info is-large">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Hoverflow</h1>
          <h2 class="subtitle">Where a question can change other perople opinion</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    if (localStorage.getItem("token")) {
      console.log("hehehe");
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Fredoka+One&display=swap');

.hero {
  background: #8360c3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.title{
    font-size: 90px;
    font-weight: bolder;
    text-align: left;
    font-family: 'Fredoka One', cursive;
}
.subtitle{
    text-align: left;
}
</style>
