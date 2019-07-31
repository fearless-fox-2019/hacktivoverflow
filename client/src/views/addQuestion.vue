<template>
    <div>
        <navBar></navBar>
        <div class="container" style="margin-top: 7%">
            <h4 class="title is-4">Post New Question</h4>
            <formQuestion style="margin-left: 15%"
                :question="newQuestion"
                @gotData="sendQuestion"
            >
            </formQuestion>
        </div>
    </div>
</template>

<script>
import navBar from '@/components/navbarLogin.vue'
import formQuestion from '@/components/formQuestion.vue'
import { mapActions } from 'vuex'
export default {
    name:'addQuestion',
    components:{
        formQuestion,
        navBar
    },
    data(){
        return {
            newQuestion:{
                title:'',
                description:'',
                tags:[]
            }
        }
    },
    methods:{
        ...mapActions(['createQuestion']),

        sendQuestion(data){
            this.createQuestion(data)
        }
    }
}
</script>

<style>

</style>
