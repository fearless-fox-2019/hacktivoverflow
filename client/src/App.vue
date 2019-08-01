<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      disable-route-watcher
      v-if="$store.state.isLogin"
    >
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" @click="action(item.text)">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="white" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="green" v-if="$store.state.isLogin" ></v-app-bar-nav-icon>
      <v-toolbar-title @click="home" class="mr-12 align-center" id="home">
        <v-img src="./assets/i-FLOW.png" height="40" width="150"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="!$store.state.isLogin">
        <v-btn @click="login" style="margin-right:10px" color="green">Login</v-btn>
        <v-btn @click="register" color="green">Register</v-btn>
      </div>
      <div v-if="$store.state.isLogin">
        <v-btn style="margin-right:10px" @click="logout" color="red">Logout</v-btn>
      </div>
    </v-app-bar>

    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Swal from "sweetalert2"
export default {
  components: {
    Home
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "far fa-question-circle", text: "All Question" },
      { icon: "fas fa-users", text: "All Users" },
      { icon: "fas fa-briefcase", text: "Developer Job" }
    ]
  }),
  methods: {
    action(param) {
      if (param == "All Question") {
        this.$router.push("/");
      }
      else if( param == "All Users") {
        this.$router.push("/users")
      }
      else if(param == "Developer Job") {
        this.$router.push("/jobs")
      }
    },
    logout() {
      this.$store.state.isLogin = false;
      Swal.fire({
        type: "success",
        title: `Succes Logout`,
        showConfirmButton: false,
        timer: 1500
      });
      localStorage.clear();
      this.$router.push("/signin");
    },
    home() {
      this.$router.push("/");
    },
    login() {
      this.$router.push("/signin");
    },
    register() {
      this.$router.push('/signup')
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch("getQuestions");
    this.$store.dispatch("getUsers");
    this.$store.dispatch("getJob")
    this.$store.dispatch("getAnswers")
    if (localStorage.getItem("token")) {
      this.$store.state.isLogin = true;
    }
  }
};
</script>

<style>
#home {
  cursor: pointer;
}
</style>
