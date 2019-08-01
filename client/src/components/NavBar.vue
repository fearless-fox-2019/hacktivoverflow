<template>
  <div id="nav">
      <div class="custom-nav-container d-flex align-items-center  justify-content-between px-2  py-3 shadow-sm">
      <a class="text-clipped navbar-brand" >
        <img src="../assets/images/instrom.png" alt="logo" style="width: 100px; height: 100px;">
          <!-- <i class="fas fa-shoe-prints d-flex">
              <span class="m-auto">Hacktiv8</span>
          </i> -->
      </a>
      <div class="main-nav-outer d-flex">
         <i class="fal fa-times text-clipped menu-close-icon d-lg-none"></i>
         <nav class="main-nav navbar navbar-light navbar-expand-lg text-center m-auto">
             <ul class="navbar-nav d-flex">
                <li class="nav-item">
                    <router-link to="/" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                  <!-- <div class="dropdown">
                    <a data-toggle ="dropdown" href="#" class="nav-link dropdown-toggle">Brand</a>
                    <div class="dropdown-menu text-clipped">
                        <a href="/shoes/Nike" class="dropdown-item">Nike</a>
                        <a href="/shoes/Adidas" class="dropdown-item">Adidas</a>
                        <a href="/shoes/Air Jordan" class="dropdown-item">Air Jordan</a>
                        <a href="/shoes/Converse" class="dropdown-item">Converse</a>
                    </div>
                  </div> -->
                  </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-b-modal.loginForm v-if="!isLogin">Login</a>
                    </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-b-modal.registerForm v-if="!isLogin">Register</a>
                  </li>
                  <li class="nav-item">
                      <a href="#" class="nav-link" v-if="isLogin" @click="signOut"> Sign Out</a>
                  </li>
             </ul>
         </nav>
      </div>
      <div class="nav-icons-container d-flex justify-content-between">
          <div class="nav-icons">
              <a class="">
                  <router-link to="">

                  <i class="fal fa-search text-clipped">
                  </i>
                  </router-link>
              </a>
          </div>
          <div class="nav-icons">
              <a class="text-clipped">
                  <i class="fal fa-bars open-menu-icon text-clipped">
                  </i>
              </a>
          </div>
      </div>
     </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState(['isLogin'])
    },
    methods: {
        signOut() {
            localStorage.clear()
            this.$store.commit('LOGIN_FALSE')
            this.$swal({
                type: 'success',
                text: 'sukses logout',
                showConfirmButton: false,
                timer: 1000
            })
            this.$router.push('/')
        }
    }

}
</script>

<style>
.img-responsive {
    height: auto;
    width: auto;
    max-height: 200px;
    max-width: 250px;
}
</style>
