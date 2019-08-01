<template>
  <div>
    <b-form @reset="onReset">
      <b-form-group
        label="Email Address:"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>


      <b-button @click="loginUser" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
  // const baseUrl = `http://localhost:3000`
  const baseUrl = `http://35.240.247.85/`

  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          password: ''
        },
      }
    },
    methods: {
      loginUser() {
        axios({
          url: `${baseUrl}/api/users/login`,
          method: "post",
          dataType: "json",
          data: this.form,
        })
        .then(({data})=>{
          console.log(data)
          localStorage.setItem('token', data.token)
          localStorage.setItem('id', data.id)
          this.$store.commit('changeLogin', true)
          Swal.fire('Login sucessfully')
        })
        .catch((err)=>{
          console.log(err)
          Swal.fire(err.response.data.message)
        })
      },
      onReset() {
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
      }
    }
  }
</script>

<style>

</style>
