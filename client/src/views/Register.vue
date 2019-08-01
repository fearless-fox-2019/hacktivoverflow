<template>
    <div class="container" style="padding-top: 50px;">
        <b-button @click="change('')" type="button" variant="success">Home</b-button>
        <br>
        <b-card>
            <b-form @submit.prevent="onSubmit" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                id="input-1"
                v-model="newData.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="newData.username"
                required
                placeholder="Enter name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="newData.password"
                type="password"
                required
                ></b-form-input>
            </b-form-group>
            <p>{{newData}} form</p>
            <b-button type="submit" variant="warning">Register</b-button>
            <b-button @click="change('login')" type="button" variant="primary">Login</b-button>

            </b-form>

        </b-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      newData: {
        email: '',
        username: '',
        password: ''
      },
      show: true
    }
  },
  created(){
    this.newData.clear()
  },
  methods: {
    change(value){
        this.$store.dispatch('changePage', value)
        this.$router.push(`/${value}`)
    },
    onSubmit(){
      console.log(this.newData)
      this.$store.dispatch('register', this.newData)
      this.$router.push(`/login`)
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our newData values
      this.newData.email = ''
      this.newData.name = ''
      this.newData.password = ''
      // Trick to reset/clear native browser newData validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>