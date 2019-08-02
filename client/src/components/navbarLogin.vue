<template>
    <div>
        <nav class="navbar is-light has-shadow is-fixed-top" style="box-shadow: 10px 10px 5px lightgrey;">
            <div class="navbar-brand">
                <a class="navbar-item" @click="toHome">
                  <img src="../assets/Logo.png" alt="Logo H8-Overflow" width="112" height="60">
                </a>
            </div>
            <div class="navbar-menu">
              <div class="navbar-start">
                <div class="navbar-item">
                  <a>
                    <router-link to="/home">
                      <i class="fas fa-home"></i> Home
                    </router-link>
                  </a>
                </div>
                <div class="navbar-item">
                  <a>
                    <router-link to="/my-question">
                      <i class="fas fa-paper-plane"></i> My Question
                    </router-link>
                  </a>
                </div>
              </div>

              <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                    <p class="control">
                       <b-button type="is-link" rounded outlined @click="logout">Sign Out</b-button>
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
  name: 'navBar',
  methods: {
    toHome () {
      this.$router.push('/home')
    },
    logout () {
      Swal.fire({
        title: 'Are you sure to sign out?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          localStorage.clear()
          this.$router.push('/')
          // sign out google
          var auth2 = gapi.auth2.getAuthInstance()
          auth2.signOut()
            .then(() => {
              localStorage.clear()
              this.$router.push('/')
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
