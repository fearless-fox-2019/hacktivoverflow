<template>
    <b-modal id="modal-register" ref="modal-register" title="Register">
        <b-form id="form-register">
            <b-form-input v-model="username" placeholder="username" type="text" class="mt-2"></b-form-input>
            <b-form-input v-model="email" placeholder="email" type="email" class="mt-2"></b-form-input>
            <b-form-input v-model="password" placeholder="password" type="password" class="mt-2"></b-form-input>
        </b-form>
        <div slot="modal-footer">
            <b-button @click="register">Register</b-button>
            <b-button @click="$refs['modal-register'].hide()" class="ml-2">Cancel</b-button>
        </div>
    </b-modal>
</template>

<script>
import axios from 'axios'
export default {
    data () {
        return {
            username: '',
            email: '',
            password: ''
        }
    },
    methods: {
        register () {
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/users/signup',
                data: {
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) => {
                this.username = ''
                this.email = ''
                this.password = ''
                this.$refs['modal-register'].hide()
                console.log(data)
            })
            .catch( err => console.log(err))
        }
    }
}
</script>

<style>

</style>
