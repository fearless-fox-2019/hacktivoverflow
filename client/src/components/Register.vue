<template>
  <b-modal id="register" title="Signup" @ok="register(registerForm)">
    <form class="d-flex flex-column">
      <input type="text" placeholder="Username..." v-model="registerForm.username" />
      <input type="text" placeholder="Email..." v-model="registerForm.email" />
      <input type="password" placeholder="Password..." v-model="registerForm.password" />
    </form>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      registerForm: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["register"])
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
