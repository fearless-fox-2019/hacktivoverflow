<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view style="margin-top: 7vh"/>
    <!-- <div :style="{'color' :  isRed ?  'red' :  'blue'}">
      ini red
    </div> -->
  </div>
</template>

<script>
import NavigationBar from './components/Nav-Bar.vue';

export default {
  created() {
    this.$store.commit('checkLoggedUser');
    this.$store.dispatch('getJob');
    this.$store.dispatch('getQuestions');
    this.$store.dispatch('getUserQuestions');
    this.$store.dispatch('getUserAnswers');
  },
  components: {
    NavigationBar,
  },
  data() {
    return {
    };
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
