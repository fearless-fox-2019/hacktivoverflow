<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/allQuestion">HacktivOverFlow</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-if="loggedIn">
              <a class="nav-link" href="/ask">Ask!</a>
            </li>
          </ul>
        </div>
        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="loggedIn">
              <a href="#" class="nav-link" v-on:click.prevent="logout()">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>



<script>
export default {
  name: "navBar",
  props: ["loggedIn"],
  components: {},
  methods: {
    logout() {
      this.$store.commit("userLoggedOut");
      localStorage.clear();
    }
  }
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
#navBar {
  padding: 30px;
}

#navBar navBar {
  font-weight: bold;
  color: #2c3e50;
}

#navBar navBar.router-link-exact-active {
  color: #42b983;
}
</style>