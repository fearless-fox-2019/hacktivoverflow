<template>
  <b-modal
      id="registerForm"
      title="Register Form"
      ref="my-modal"
      hide-footer
    >
      <form ref="form">
        <b-form-group
          label="Email"
          label-for="name-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="name-input"
            v-model="register.email"
            required
            type="email"
          ></b-form-input>
        </b-form-group>
         <b-form-group
          label="Username"
          label-for="username-input"
          invalid-feedback="username is required"
        >
          <b-form-input
            id="username-input"
            required
            v-model="register.username"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="password-input"
            v-model="register.password"
            required
            type="password"
          ></b-form-input>
        </b-form-group>
        <b-button pill variant="success" class="float-right" @click="registerUser">Register</b-button>
      </form>
    </b-modal>
</template>

<script>
export default {
  data() {
    return {
      register: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser() {
      this.$store.dispatch('registerUser',this.register)
      this.hideModal()
      // v.b.modal.loginForm
    },
    hideModal() {
     this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>

</style>
