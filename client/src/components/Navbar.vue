<template>
  <nav class="navbar navbar-expand-lg fixed-top d-flex align-items-center">
    <a class="left-section navbar-brand col-2" href="#">Hacktivoverflow</a>

    <div class="middle-section collapse navbar-collapse col-7" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active" @click.prevent="home">
          <router-link to="/">
            <a class="nav-link" href>Home</a>
          </router-link>
        </li>
        <li class="nav-item" v-if="getLoginStatus">
          <b-button v-b-modal.modal-1 secondary class="make-question primary">Ask Question</b-button>
          <FormQuestion></FormQuestion>
        </li>
      </ul>
    </div>

    <div class="right-section col-3">
      <form class="form-inline my-2 my-lg-0" v-if="false">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div class="user-gate" v-if="!getLoginStatus">
        <b-button v-b-modal.login secondary class="make-question">Signin</b-button>
        <b-button v-b-modal.register secondary class="make-question">Signup</b-button>
        <Register></Register>
        <Login></Login>
      </div>
      <div class="logout" v-if="getLoginStatus">
        <b-button class="make-question" @click.prevent="logout">Logout</b-button>
      </div>
    </div>
  </nav>
</template>

<script>
import FormQuestion from "@/components/FormQuestion.vue";
import Register from "@/components/Register.vue";
import Login from "@/components/Login.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    FormQuestion,
    Register,
    Login
  },
  methods: {
    ...mapMutations(["changeLoginExist", "logout"]),
    ...mapActions(["home"])
  },
  computed: {
    ...mapGetters(["getLoginStatus"])
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.changeLoginExist();
    }
  }
};
</script>

<style scoped>
.make-question {
  background-color: rgb(133, 203, 212);
  border: none;
  margin-right: 10px;
}

nav.navbar {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.376);
  background-color: rgb(17, 60, 77);
}

li {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
