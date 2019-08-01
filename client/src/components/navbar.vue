<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
    <div class="logo" />
    <a-menu
      theme="dark"
      mode="horizontal"
      :defaultSelectedKeys="['1']"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="1">
        <router-link to="/"><a-icon type="home" />HacktivOverflow</router-link>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/register" v-if="!logintype"><a-icon type="unlock" />Sign Up</router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/login" v-if="!logintype"><a-icon type="login" />Sign In</router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link to="/myquestion" v-if="logintype"><a-icon type="user" />My Question</router-link>
      </a-menu-item>
      <a-menu-item key="5" @click="logout" v-if="logintype">
       <a-icon type="logout" /> Sign Out
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {
  computed: {
    logintype() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$store.commit("ISLOGIN", false);
      this.$store.commit("ISUSER", null);
      this.$store.dispatch('GETQUESTION')
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
