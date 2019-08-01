<template>
  <div class="search">
    <div class="columns is-desktop">
      <div class="column is-2"></div>
      <div class="column">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/landing");
    }
  }
};
</script>

<style scoped>
</style>
