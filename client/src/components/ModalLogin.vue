<template>
    <b-modal id="modal-login" ref="modal-login" title="Login">
        <b-form id="form-login">
            <b-form-input v-model="email" placeholder="email" type="email" class="mt-2"></b-form-input>
            <b-form-input v-model="password" placeholder="password" type="password" class="mt-2"></b-form-input>
        </b-form>
        <div slot="modal-footer">
            <b-button @click="login">Login</b-button>
            <b-button @click="$refs['modal-login'].hide()" class="ml-2">Cancel</b-button>
        </div>
    </b-modal>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login () {
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/users/signin',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                this.$store.commit('login',data)
                this.email = ''
                this.password = ''
                this.$refs['modal-login'].hide()
                console.log(data)
            })
            .catch( err => console.log(err))
        }
    }
}
</script>

<style>

</style>
