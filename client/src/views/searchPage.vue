<template>
    <div class="search-page">
        <b-container fluid>
            <b-row>
                <b-col cols=2>
                    <sidebar/>
                </b-col>
                <b-col cols=7>
                    <!-- <button @click="askQuestion" class="button-ask">Ask a question</button> -->
                    <list-question v-for="question in questions" :key="question._id" :question="question"/>          
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import sidebar from '../components/sidebar.vue'
import listQuestion from '../components/listQuestion.vue'
import {mapState} from 'vuex'

export default {
    components : {
        sidebar, 
        listQuestion
    },
    created(){
        console.log(this.questions);
    },
    computed : {
        ...mapState(['questions'])
    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>
