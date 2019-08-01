<template>
  <div class="sign">
    <div class="columns is-desktop">
      <div class="column"></div>
      <div class="column mid is-desktop">
        <div class="signin" v-show="isloginform">
          <h1>Login</h1>
          <form @submit.prevent="login">
            <b-field class="signinform" label="Email" autofocus="true">
              <b-input type="email" v-model="signinform.email"></b-input>
            </b-field>
            <b-field class="signinform" label="Password">
              <b-input type="password" v-model="signinform.password" password-reveal></b-input>
            </b-field>
            <span>
              Don`t have an account?
              <span class="clickablelink" @click="changeform">Register</span>
            </span>
            <div class="buttonchoice">
              <b-button class="button" type="submit" @click="login">Signin</b-button>
              <input type="submit" class="hidden-button" />
              <a class="link" @click="changeform">Register</a>
            </div>
          </form>
        </div>
        <div class="signup" v-show="!isloginform">
          <h1>Login</h1>
          <form @submit.prevent="register">
            <b-field class="signupform" label="Username">
              <b-input v-model="signupform.username" maxlength="30"></b-input>
            </b-field>

            <b-field class="signupform" label="Email">
              <b-input type="email" v-model="signupform.email" maxlength="30"></b-input>
            </b-field>

            <b-field class="signupform" label="Password">
              <b-input type="password" v-model="signupform.password" password-reveal></b-input>
            </b-field>
            <span>
              Already have an account?
              <span class="clickablelink" @click="changeform">Login</span>
            </span>
            <br />
            <b-button class="button" type="is-info" @click="register">Submit</b-button>
            <input type="submit" class="hidden-button">
          </form>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signinform: {
        email: "",
        password: ""
      },
      signupform: {
        username: "",
        email: "",
        password: ""
      },
      isloginform: true
    };
  },
  methods: {
    changeform() {
      if (this.isloginform) {
        this.isloginform = false;
      } else {
        this.isloginform = true;
      }
    },
    login() {
      console.log(this.signinform);
      this.$store.dispatch("login", this.signinform);
    },
    register() {
      console.log(this.signupform, "----");
      this.$store.dispatch("register", this.signupform);
    }
  },
  created(){
      if(localStorage.getItem('token')){
        //   this.$router.push('/home')
      }
  }
};
</script>

<style scoped>
.hidden-button {
  width: 0px;
  height: 0px;
  padding: 0px;
  border: 0px;
  visibility: hidden;
}
.mid {
  border: 1px solid slateblue;
  position: relative;
  left: auto;
  right: auto;
  top: 100px;
  min-height: 36vh;
  max-width: 300px;
  border-radius: 7px;
}

.signinform {
  width: 250px;
  align-items: center;
  margin: 0px auto;
}
.signupform {
  width: 250px;
  align-items: center;
  margin: 0px auto;
}
.button {
  margin: 15px 10px 0px 10px;
}
.buttonchoice {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-align: center;
}
.link {
  margin: 10px;
}
span {
  font-size: 10px;
}
.clickablelink {
  cursor: pointer;
  color: cadetblue;
}
.clickablelink:hover {
  cursor: pointer;
  color: blue;
}
</style>
