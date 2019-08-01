<template>
  <div class="column is-half is-offset-one-quarter">
    <!-- Tabs -->
    <div class="box">
      <b-tabs position="is-centered" class="block head-form">
        <b-tab-item label="Sign In">
          <!-- Sign In -->
          <b-field label="E-Mail" style="margin-top : 2.5vh">
            <b-input type="email" placeholder="Enter E-Mail" v-model="form.email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input password-reveal
            placeholder="Enter Password"
            v-model="form.password"
            type="password"></b-input>
          </b-field>
          <b-button @click.prevent="signIn" type="is-primary" rounded>Sign In</b-button>
        </b-tab-item>
        <!-- Sign Up -->
        <b-tab-item label="Sign Up">
          <b-field label="Fullname" style="margin-top : 2.5vh">
            <b-input type="text"
              required
              placeholder="Enter Name"
              v-model="form.fullname"></b-input>
          </b-field>
          <b-field label="E-Mail">
            <b-input
            required type="email"
            placeholder="Enter E-Mail"
            v-model="form.email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input password-reveal
            required
            validation-message="Password Can Only Contain Alpha-Numeric and Minimum 8 Character"
            pattern="^[a-zA-Z ]{8}$"
            placeholder="Enter Password"
            v-model="form.password"
            type="password"></b-input>
          </b-field>
          <b-button @click.prevent="signUp" type="is-primary" rounded>Sign Up</b-button>
        </b-tab-item>
      </b-tabs>
    </div>

  </div>
</template>

<script>
import { NotificationProgrammatic as Notification } from 'buefy/dist/components/notification';

export default {
  data() {
    return {
      form: {
        fullname: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    signIn() {
      const payload = {
        email: this.form.email,
        password: this.form.password,
      };
      this.$store.dispatch('signIn', payload);
    },
    signUp() {
      const payload = {
        fullname: this.form.fullname,
        username: this.form.fullname.split(' ').join('').toLowerCase(),
        email: this.form.email,
        password: this.form.password,
      };
      this.$store.dispatch('signUp', payload);
    },
  },
};
</script>

<style scoped>

.head-form {
  padding : 0 10vw;
}

.box {
  width : 50vw;
  min-height : 50vh;
  margin-top : 15vh
}

.button {
  margin-top: 2.5vh;
  font-weight: 600
}

</style>
