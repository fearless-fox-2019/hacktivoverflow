<template>
    <div>
        <b-modal
            id="modal-login"
            ref="modal"
            title="Login"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            <form ref="form" id="login-form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    :state="emailState"
                    label="Email"
                    label-for="email-input"
                    invalid-feedback="Email is required"
                    >
                    <b-form-input
                        id="email-input"
                        v-model="email"
                        type="text"
                        :state="emailState"
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
                        required
                    ></b-form-input>
                </b-form-group>
            </form>

            <div slot="modal-footer">
                <b-button variant="primary" type="submit" form="login-form">
                    Login
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
      password: '',
      passwordState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.emailState = valid ? 'valid' : 'invalid';
      this.passwordState = valid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.email = '';
      this.emailState = null;
      this.password = '';
      this.passwordState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    doLogin() {
      return axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/auth/login`,
        data: {
          email: this.email,
          password: this.password,
        },
      });
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {

      } else {
        this.doLogin()
          .then(({ data }) => {
            console.log(data);
            this.resetModal();
            this.$store.commit('updateData', data);
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
