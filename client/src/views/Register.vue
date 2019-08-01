<template>
  <div>
   <a-row style="padding-top:150px">
      <a-col :span="9"></a-col>
      <a-col :span="6">
        <img src="https://s3.amazonaws.com/wgvs-inbound-prod/avatars/default/avatar5.png" alt="avatar" style="width:50px;padding-bottom:30px">
        <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit.prevent="register"
  >
    <a-form-item>
      <a-input
      v-model="datauser.email"
        v-decorator="[
          'Email',
          { rules: [{ required: true, message: 'Please input your email!' }] }
        ]"
        placeholder="Email"
      >
        <a-icon
          slot="prefix"
          type="mail"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
        <a-form-item>
      <a-input
      v-model="datauser.username"
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
        placeholder="Username"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model="datauser.password"
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
      >
        Sign Up
      </a-button>
    </a-form-item>
  </a-form>
      </a-col>
      <a-col :span="9"></a-col>
    </a-row>
  </div>
</template>

<script>
import ax from '@/axiosApi.js'

export default {
  name: 'register',
  data () {
    return {
      datauser: {
        email: '',
        password: '',
        username: ''
      }
    }
  },
  methods: {
    register () {
      ax.post('users/register', {
        email: this.datauser.email,
        password: this.datauser.password,
        username: this.datauser.username
      })
        .then(response => {
          this.$message.loading('Signing Up..', 2.5)
          .then(() => this.$message.success('successfully sign up', 2.5))
          console.log(response.data)
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
          this.$message.error(err.response.data.message)
        })
    }
  }
}
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
