<template>
    <div class="landing" v-if="!$store.state.isLogin">
        <h1>ini landing page</h1>
    </div>
</template>

<script>
export default {
    mounted(){
        if(localStorage.getItem('token')){
            console.log('hehehe')
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>

</style>
