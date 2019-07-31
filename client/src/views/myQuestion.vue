<template>
    <div>
        <navBar></navBar>
        <div class="columns" style="margin-top: 7%">
            <div class="column is-10 is-offset-1 ">
                <h3>All My Question</h3>
                <hr style="height: 2px; background-color:black">
                <div v-for="question in myQuestion" :key="question._id">
                    <cardQuestion :question="question"></cardQuestion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from '@/components/navbarLogin.vue'
import cardQuestion from '@/components/cardQuestion.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'myQuestion',
    components:{
        navBar,
        cardQuestion
    },
    methods:{
        ...mapActions(['getMyQuestion'])
    },
    computed:{
        ...mapState(['myQuestion'])
    },
    created(){
        this.getMyQuestion
    }

}
</script>

<style>

</style>
