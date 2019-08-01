<template>
  <div id="app">
    <div id="nav">
      <div v-if="isLogin">
        <div v-if="!onClickTag" class="navigate">
          <router-link to="/">
            <i class="fas fa-home"></i> Home
          </router-link>
          <router-link to="/newQuestion">
            <i class="fas fa-plus"></i> Question
          </router-link>
          <router-link to="/explore">
            <i class="fas fa-compass"></i> Explore
          </router-link>
          <a @click="logout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </div>
        <div v-if="onClickTag" class="navigate">
          <a class="button is-white" @click="$store.commit('clickTag', false)">
            <i class="fas fa-chevron-left" style="margin-right:10px"></i> BACK
          </a>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["isLogin", "onClickTag"])
  },
  created() {
    if (!localStorage.getItem("access_token")) {
      this.$router.push("/");
    }
    this.$store
      .dispatch("findCurrentUser")
      .then(() => {})
      .catch(err => {});
    this.$store
      .dispatch("getAllQuestions")
      .then(() => {})
      .catch(err => {});
    this.$store
      .dispatch("getAllTags")
      .then(() => {})
      .catch(err => {});
  }
};
</script>



<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
  background-size: cover;
  background-position-y: -80px;
  height: 100vh;
}
#nav {
  padding: 15px;
  background-color: rgba(255, 255, 255, 1);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.navigate {
  display: flex;
  justify-content: space-around;
}
</style>

