<template>
<div>
  <b-modal
      id="loginForm"
      title="Login Form"
      ref="my-modal"
    >
      <form ref="form">
        <b-form-group
          label="Email"
          label-for="name-input"
          invalid-feedback="Email is required"
        >
          <b-form-input
            id="name-input"
            v-model="login.email"
            required
            type="email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password-input"
          invalid-feedback="Password is required"
        >
          <b-form-input
            id="password-input"
            v-model="login.password"
            required
            type="password"
          ></b-form-input>
        </b-form-group>
        <b-button pill variant="success" class="float-right" @click="loginUser">Login</b-button>
      </form>
    </b-modal>
</div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser() {
      this.$store.dispatch('loginUser',this.login)
      this.hideModal()
      this.$store.commit('WATCH_STYLING')
      // this.count++
      // this.$emit('styling',count)
    },
    hideModal() {
     this.$refs['my-modal'].hide()
    }
  }
}
</script>

<style>

</style>
