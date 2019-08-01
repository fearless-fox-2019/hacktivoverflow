<template>
    <div>
        <navBar></navBar>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import navBar from '@/components/navbarLogin.vue'
import { mapActions } from 'vuex'

export default {
    name:'detailQuestion',
    components:{
        navBar
    },
   
}
</script>

<style>

</style>
