<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="../assets/logo-2.png" width="150" height="45">
    </a>

    <a role="button"
      class="navbar-burger burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
        <router-link to="/">
        Home
        </router-link>
      </a>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a v-if="!isLogin" class="button is-primary">
            <router-link to="/signin">
              <strong style="color: #fff">Sign up</strong>
            </router-link>
          </a>
          <a v-if="isLogin" @click.prevent="signOut" class="button is-primary">
            <strong style="color: #fff">Sign Out</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    signOut() {
      this.$store.commit('postSignOut');
    },
  },
  computed: mapState({
    isLogin: state => state.isLogin,
  }),
};
</script>

<style>
  .navbar a {
    /* color: #69D1C0; */
    font-weight: 600;
  }

  .navbar {
    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;
  }

  a.navbar-item:hover {
    /* color: #211B31 !important; */
    /* background-color: #69D1C0 !important; */
    font-weight: 600;
  }

  nav.navbar {
    /* background-color: #211B31; */
  }

  .button.is-primary {
    /* background-color: #69D1C0 !important; */
    border-color: transparent;
    /* color: #211B31 !important; */
  }

  .button.is-primary-white {
    /* background-color: #69D1C0 !important; */
    border-color: transparent;
    /* color: #fff !important; */
  }

  /* .button.is-secondary {
    background-color: #211B31 !important;
    border-color: transparent;
    color: #69D1C0!important;
  } */

</style>
