<template>
  <b-modal id="login" title="Signin" @ok="login(formLogin)">
    <form class="d-flex flex-column">
      <input type="text" placeholder="Email..." v-model="formLogin.email" />
      <input type="password" placeholder="Password..." v-model="formLogin.password" />
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"])
  }
};
</script>

<style scoped>
input {
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid rgb(153, 153, 153);
  margin-bottom: 20px;
}
</style>
