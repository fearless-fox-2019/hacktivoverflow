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
    @submit.prevent="login"
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
        Log in
      </a-button>
      Or <a href="" @click.prevent="$router.push('/register')">
        register now!
      </a>
    </a-form-item>
  </a-form>
      </a-col>
      <a-col :span="9"></a-col>
    </a-row>
  </div>
</template>

<script>
import ax from '@/axiosApi'
export default {
  name: 'login',
  data () {
    return {
      datauser: {
        email: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  created(){
    if(localStorage.token){
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      ax.post('/users/login', {
        email: this.datauser.email,
        password: this.datauser.password
      })
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.id)
          
          this.$store.commit('ISLOGIN', true)
          this.$store.commit('ISUSER', data.id)
          this.$message.loading('Logging in..', 2.5)
          .then(() => this.$message.success('Successfully Logged In', 1))
          .then(()=> this.$router.push('/'))
          
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
