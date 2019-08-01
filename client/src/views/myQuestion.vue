<template>
    <div>
        <navBar></navBar>
        <div class="columns" style="margin-top: 7%">
            <div class="column is-10 is-offset-1 ">
                <h3 class="title is-3">All My Question</h3>
                <hr id="section">
                <form @submit.prevent="searchQuestion">
                    <b-field style="width: 800px; margin-left: 12%; margin-bottom: 20px">
                        <b-input placeholder="Your Question..."
                            v-model="keyword"
                            type="search"
                            icon-pack="fas"
                            icon="search"
                            rounded
                            >
                        </b-input>
                    </b-field>
                </form>
                <p v-if="filterQuestion.length === 0" class="title is-6"> No Question!</p>
                <div v-for="question in filterQuestion" :key="question._id">
                    <cardQuestion :question="question" style="width: 1000px; margin-left: 30px"></cardQuestion>
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
    data(){
        return {
            keyword:''
        }
    },
    components:{
        navBar,
        cardQuestion
    },
    methods:{
        ...mapActions(['getMyQuestion'])
    },
    computed:{
        ...mapState(['myQuestion']),

        filterQuestion(){
            let dataFilter= this.myQuestion.filter(el => {
                    
                    return el.title.toLowerCase().includes(this.keyword.toLowerCase())
                })
                // if(dataFilter.length === 0) return this.articles
                //     else
                     return dataFilter
        }

    },
    created(){
        this.getMyQuestion()
    }

}
</script>

<style scoped>
#section{
    width: 1100px;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.5);
    margin-left: -1%;
    box-shadow: 2px 2px 4px coral
}
</style>
