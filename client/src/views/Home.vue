<template>
  <div id="container" class="d-flex justify-content-between">

    <div class="col-12" id="content-body">
      <div id="content">
        <router-view></router-view>
      </div>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  created() {
    this.$store.commit('resetStore');
    this.$store.dispatch('getQuestions');
  },
  components: {
  },
};
</script>

<style scoped>
  #container{
    padding: 15px;
    height: 90vh;
  }
  #content-body{
    height: 100%;
    padding: 10px;
  }
  #content{
    width: 100%;
    border: solid 1px black;
    height: 100%;
    background-color: #0b0c10;
    border-radius: 20px;
  }
  #extra-body{
    height: 100%;
    padding: 10px;
  }
  #extra{
    width: 100%;
    border: solid 1px black;
    height: 100%;
    background-color: #0b0c10;
    border-radius: 20px;
  }
</style>
