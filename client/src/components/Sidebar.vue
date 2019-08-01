<template>
  <div class="sidebar-container d-flex justify-content-center">
    <ul class="list-group list-group-flush" style="position: fixed; margin-top: 35px">
      <li class="link list-group-item li-side-bar" @click="goToHome()">Home</li>
      <li class="link list-group-item li-side-bar" v-if="isLogin" @click="goToMyQuestion()">My Questions</li>
      <li class="link list-group-item li-side-bar" @click="goToTags()">Tags</li>
      <li class="link list-group-item li-side-bar" v-if="isLogin" @click="goToWatchedTags()">Watched Tags</li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push("/");
    },

    goToMyQuestion() {
      this.$router.push("/question/user");
    },

    goToTags() {
      this.$alertify.error(`Please try again or check your internet connection`);
    },

    goToWatchedTags() {
      this.$alertify.error(`Please try again or check your internet connection`);
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  }
};
</script>

<style>
.sidebar-container {
  width: 200px;
}
.link {
  font-size: 15px;
}
.link:hover {
  cursor: pointer;
  font-weight: 600;
}
.li-side-bar {
  padding-left: 0;
  width: 200px;
  display: flex;
  justify-content: start
}
</style>