<template>
    <div>
    <b-navbar toggleable="lg" id="navbar" fixed="top">
        <b-navbar-brand href="#">
            <img
            class="m-0"
            src="https://storage.googleapis.com/adityabpradana-hacktiv8/Logo-Sleepless-Dark.png"
            height="32px"
            alt="Sleepless">
        </b-navbar-brand>
        <b-input-group class="flex-sm-fill mx-4 pl-3">
            <b-form-input
            placeholder="Search..."
            size="sm">
            </b-form-input>
            <b-input-group-append>
                <b-button size="sm"
                variant="outline-secondary">
                    <i class="material-icons" 
                    style="font-size: 14px;">
                    search
                    </i>
                </b-button>
            </b-input-group-append>
        </b-input-group>
        <b-navbar-nav v-show="!$store.state.isLogin" class="ml-auto">
            <b-nav-item>
                <b-button
                class="mr-1"
                size="sm"
                variant="outline-primary"
                style="border: 0;"
                v-b-modal="'modal-login'">
                Login
                </b-button>
            </b-nav-item>
            <b-nav-item>
                <b-button
                class="ml-1"
                size="sm"
                variant="primary"
                style="border: 0;"
                v-b-modal="'modal-register'">
                Register
                </b-button>
            </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-show="$store.state.isLogin" class="ml-auto">
            <b-nav-item>
                <b-button
                size="sm"
                variant="primary"
                style="border: 0;"
                v-b-modal="'modal-question'">
                    <i class="material-icons"
                    style="font-size: 20px; margin: 0; padding: 0; vertical-align: middle;" >
                    add
                    </i> 
                </b-button>
            </b-nav-item>
            <b-nav-item>
                <b-button size="sm"
                variant="danger"
                style="border: 0;"
                @click="$store.commit('logout')">
                Logout
                </b-button>
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar>

    <ModalRegister/>
    <ModalLogin/>
    <ModalQuestion/>
    </div>
</template>

<script>
import axios from 'axios'
import ModalRegister from '@/components/ModalRegister.vue'
import ModalLogin from '@/components/ModalLogin.vue'
import ModalQuestion from '@/components/ModalQuestion.vue'
export default {
    components: {
        ModalRegister,
        ModalLogin,
        ModalQuestion,
    },
};
</script>

<style>
#navbar {
    background-color: #fafafb;
    color: #222426;
    -webkit-box-shadow: 0px 3px 2px 0px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 3px 2px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 3px 2px 0px rgba(0,0,0,0.1);
    border-bottom: 1px solid #dcdcdc;
    z-index: 10;
}
</style>
