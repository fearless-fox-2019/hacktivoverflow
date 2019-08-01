<template>
  <div class="sign-up-page" style="margin-top: 40px; margin-bottom : 50px;">
    <form id="form-register" @submit.prevent="register">
      <h4>Sign Up</h4>
      <b-form-group id="input-group-3" label="First name :" label-for="register-firstname">
        <b-form-input
          id="register-firstname"
          v-model="user.firstname"
          type="text"
          required
          placeholder="Firstname"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Last name:" label-for="register.lastname">
        <b-form-input
          id="register.lastname"
          v-model="user.lastname"
          type="text"
          required
          placeholder="Lastname"
        ></b-form-input>
      </b-form-group>


      <b-form-group
        id="birtday"
        label="Birthday:"
        label-for="birthday-form"
      >
        <b-form-input
          id="birthday-form"
          v-model="user.birthday"
          type="date"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="email-register"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="email-register"
          v-model="user.email"
          type="email"
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="password" label="Password:" label-for="password">
        <b-form-input
          id="password"
          v-model="user.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
        <button type="submit" class="button-ecom" style="margin-top:35px; margin-left: 76%; border:none; width:120px; height:40px;">Register</button>
      </b-form-group>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    register () {
      let newUser = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        birthday: this.user.birthday,
        email: this.user.email,
        password: this.user.password
      }
      this.$store.dispatch('register', newUser)
        .then(data => {
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
#form-register {
  background-color: white;
  padding-top: 40px;
  margin-left: auto;
  margin-right: auto;
  padding: 5%;
  border: 0.5px solid #fe7f2d;
  border-radius: 2%;
  box-shadow: 0px 10px 30px #fcca46;
  transition: all 0.3s ease 0s;
  width: 60%;
  height: 650px;
  padding: 2%;
}

</style>
