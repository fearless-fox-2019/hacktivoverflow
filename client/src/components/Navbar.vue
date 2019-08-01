<template>
  <div>
    <nav class="navbar navbar-light my-nav my-nav--fixed white">
      <!-- <a href="#" class="nav-plus"><i class="fas fa-chevron-left"></i></a> -->
      <!-- <a href="#" class="nav-plus"><i class="fas fa-plus"></i></a> -->
      <a href="#"
        @click.prevent="goToHome"
        style="text-decoration: none"
      >
        <div
          class="navbar-brand mb-0 h1 d-flex align-self-center omni"
          style="color: #fff; margin: 0px; padding: 10px;"
        >Omniscience</div>
      </a>
      <div v-if="!isLogin">
        <a href="#" 
          @click.prevent="goToRegister"
          class="login-register">
          Register
        </a>
        <span style="margin-left: 10px; margin-right: 10px; color: white">•</span>
        <a href="#" 
          @click.prevent="goToLogin"
          class="login-register">
          Login
        </a>
      </div>
      <div class="d-flex" v-if="isLogin">
        <div class="dropdown mr-1">
          <a
            href="#"
            class="nav-plus"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            data-offset="10,200"
          >
            <i class="fas fa-chevron-down"></i>
          </a>
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenuOffset"
            style="margin-left: -140px;"
          >
            <span class="dropdown-item" href="#" style="padding-left: 10px; padding-right: 10px">
              <b>{{loginUser.username}}</b>
            </span>
            <a
              @click.prevent="goToAddQuestion"
              class="dropdown-item"
              href="#"
              style="padding-left: 10px; padding-right: 10px"
            >New Question</a>
            <a
              @click.prevent="goToMyQuestions"
              class="dropdown-item"
              href="#"
              style="padding-left: 10px; padding-right: 10px"
            >My Questions</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" style="padding-left: 10px; padding-right: 10px" @click.prevent="goToLogout">Logout</a>
          </div>
        </div>
      </div>
    </nav>
    <div style="height: 3.1rem;">&nbsp;</div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    loginUser() {
      return this.$store.getters.loginUser
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToAddQuestion() {
      this.$router.push('/question/ask')
    },
    goToMyQuestions() {
      this.$router.push('/question/user')
    },
    goToLogout() {
      localStorage.clear()
      this.$store.commit('SET_IS_LOGIN_STATUS', false)
      this.$store.commit('SET_USER', {})
      this.$store.commit('SET_MY_QUESTIONS', [])
      this.$store.commit('SET_QUESTIONS_BY_TAG', [])
      this.$alertify.success(`Logout success`);
      this.$router.push('/')
    },
    goToRegister() {
      this.$router.push('/register')
    }
  }
};
</script>

<style scoped>
.my-nav--fixed {
  position: fixed;
  width: 100%;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.88);
  padding: 0;
  padding-left: 150px;
  padding-right: 150px;
}

.nav-icon i {
  font-size: 1em;
  color: black;
}

.nav-plus i {
  font-size: 1em;
  color: white;
  padding: 10px;
}

.login-register {
  text-decoration: none;
  color: white
}
</style>
