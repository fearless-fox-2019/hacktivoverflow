<template>
    <div>
        <b-navbar variant="faded" type="light">
            <b-navbar-brand @click="change('')" v-b-tooltip.hover.v-danger.bottom="'Welcome . .'">
            <img v-b-tooltip.hover.v-info.right="'HacktivOverflow'" src="https://icons-for-free.com/iconfiles/png/512/svg+overflow+stack+stackoverflow+icon-1320190544408950965.png" alt="logo" width="50px">
            HacktivOverflow
            </b-navbar-brand>
            <b-form-input id="input-small" placeholder=" ❔ Search . . ." width="10px"></b-form-input>
            <b-dropdown v-if="isLogin === false" v-b-popover.hover="'or Login'" title="Register" id="dropdown-dropleft" dropleft text="Sign In" variant="info" class="m-2 text-center my-3">
                <b-dropdown-item  @click="change('login')" ><i class="far fa-user-circle"></i> Login</b-dropdown-item>
                <b-dropdown-item  @click="change('register')"><i class="far fa-address-book"></i> Register</b-dropdown-item>
            </b-dropdown>
            <b-button @click="logoutt" v-if="isLogin === true" variant="warning">Logout</b-button>
            <b-button @click="mypost" variant="warning" v-b-popover.hover.danger="'My Post'" >@</b-button>

        </b-navbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data(){
        return{}
    },
    computed:{
        ...mapState(['isLogin'])
    },
    methods:{
        change(value){
            if(!value) value = ''
            this.$store.dispatch('changePage', value)
            this.$router.push(`/${value}`)
        },
        logoutt(){
            this.$store.dispatch('logout', false)
        },
        mypost(){
            if(localStorage.token){
                this.$router.push('/mypost')
            }else{
                this.$router.push('/')
                Swal.fire('Login dulu yaaaaa', 'error')
            }
        }
    }
}
</script>

<style scoped>
</style>
