<template>
    <div>
        <nav class="navbar is-light has-shadow is-fixed-top" style="box-shadow: 10px 10px 5px lightgrey;">
            <div class="navbar-brand">
                <a class="navbar-item">
                <img src="../assets/Logo.png" alt="Logo H8-Overflow" width="112" height="60">
                </a>
            </div>
            <div id="navbarExampleTransparentExample" class="navbar-menu">

                <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                    <p class="control">
                       <b-button type="is-link" rounded outlined @click="toLogin">Sign In</b-button>
                    </p>
                    <p class="control">
                       <b-button type="is-link" rounded outlined @click="toRegister">Sign Up</b-button>
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: 'navbarLanding',
  methods: {
    toLogin () {
      this.$emit('changePage', 'login')
    },
    toRegister () {
      this.$emit('changePage', 'register')
    }
  }
}
</script>

<style>

</style>
