<template>
    <div>
        <b-modal
            id="modal-register"
            ref="modal"
            title="Sign Up"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            <form ref="form" id="register-form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    :state="emailState"
                    label="Email"
                    label-for="email-input"
                    invalid-feedback="Email is required"
                    >
                    <b-form-input
                        id="email-input"
                        v-model="email"
                        type="email"
                        :state="emailState"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    :state="usernameState"
                    label="Username"
                    label-for="username-input"
                    invalid-feedback="Username is required"
                    >
                    <b-form-input
                        id="username-input"
                        v-model="username"
                        type="text"
                        :state="usernameState"
												minlength=6
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    :state="passwordState"
                    label="Password"
                    label-for="password-input"
                    invalid-feedback="Password is required"
                    >
                    <b-form-input
                        id="password-input"
                        v-model="password"
                        type="password"
                        :state="passwordState"
												minlength=6
                        required
                    ></b-form-input>
                </b-form-group>
            </form>

            <div slot="modal-footer">
                <b-button variant="primary" type="submit" form="register-form">
                    Sign Up
                </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      emailState: null,
      username: '',
      usernameState: null,
      password: '',
      passwordState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.emailState = valid ? 'valid' : 'invalid';
      this.usernameState = valid ? 'valid' : 'invalid';
      this.passwordState = valid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.email = '';
      this.emailState = null;
      this.username = '';
      this.usernameState = null;
      this.password = '';
      this.passwordState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    doRegister() {
      return axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/auth/register`,
        data: {
          email: this.email,
          username: this.username,
          password: this.password,
        },
      });
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {

      } else {
        this.doRegister()
          .then(() => {
            this.resetModal();
            this.$swal(
              'Succeed!!!',
              'Your account is ready to use',
              'success',
            );

            this.$nextTick(() => {
              this.$refs.modal.hide();
            });
          })
          .catch(({ response }) => {
            this.resetModal();
            this.$swal(
              'Error!!!',
              response.data.message,
              'error',
            );
          });
      }
    },
  },
};
</script>

<style>

</style>
