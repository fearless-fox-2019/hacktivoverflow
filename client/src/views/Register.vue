<template>
  <div>
    <section style="padding-top: 150px">
      <form class="form-signin" @submit.prevent="register">
        <h1 class="h5 mb-3 font-weight-normal" style="text-align:left">Please fill the field</h1>
        <label for="inputEmail" class="sr-only">Full Name</label>
        <input
          type="name"
          id="inputName"
          class="form-control"
          placeholder="Username"
          required
          autofocus
          v-model="form.username"
        />
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="email-register"
          id="inputEmail"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
          v-model="form.email"
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model="form.password"
          style="margin-bottom: 0px"
        />
        <div style="margin-bottom: 20px; text-align:left">
          <a href="#" @click.prevent="clickLogin">
            <small>Already have account?</small>
          </a>
        </div>
        <button
          class="btn btn-lg btn-block"
          type="submit"
          style="background-color: #1C1C1C; color: #fff"
        >
          <p
            class="d-flex justify-content-center align-self-center"
            style="margin: 0px; padding-bottom: 3px"
          >Sign up</p>
        </button>
      </form>
    </section>
  </div>
</template>

<script>
import myaxios from '@/apis/localhost';

export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    register() {
      myaxios
        .post('/users/register', this.form)
        .then(({ data }) => {
          localStorage.token = data.token;
          localStorage.username = data.username;
          this.$store.dispatch('setLoggedInUser').then(() => {
            if (!this.$store.getters.error) {
              this.$store.dispatch('fetchMyQuestions').then(() => {
                if (!this.$store.getters.error) {
                  setTimeout(() => {
                    this.$store.state.isLogin = true;
                    this.$alertify.success(`Welcome ${data.username}`);
                    this.$router.push('/');
                  }, 1000);
                }
              });
            }
          });
        })
        .catch(error => {
          this.$alertify.error(error.response.data);
        });
    },
    clickLogin() {
      this.$router.push('/login')
    }
  }
};
</script>

<style scoped>
body {
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  align-items: center;
  justify-content: center;
  background-color: #E5E6E7;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="name"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="email-register"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
