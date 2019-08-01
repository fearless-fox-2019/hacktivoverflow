<template>
    <div class="container" style="padding-top: 50px;">
        <b-button @click="change('')" type="button" variant="success">Home</b-button>
        <br>
        <b-card>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else."
            >
                <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Password:" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="form.password"
                type="password"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Login</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            <b-button @click="$router.push('/register')" type="button" variant="warning">Register</b-button>

            </b-form>
        </b-card>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      change(value){
        this.$store.dispatch('changePage', value)
        this.$router.push(`/${value}`)
      },
      onSubmit(evt) {
        evt.preventDefault()
        this.$store.dispatch('loginn', this.form)
        this.$router.push('/')
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>