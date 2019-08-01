<template>
    <!-- <div class="container"> -->
        <div>
            <b-row sm="8">
                <b-col>
                    <b-row>
                        <h3 class="float-left">{{getDetail.title}}</h3>
                        <b-col>
                            <b-button @click="pages" class="float-right" variant="info" >Answer this Question</b-button>
                        </b-col>
                    </b-row>
                    <b-row>
                        <p class="float-left" v-if="getDetail.views.length !== undefined">Viewed {{getDetail.views.length}} times</p>
                        <p class="float-left" v-if="getDetail.views.length === undefined">Viewed 0 times</p>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="2">
                    <div class="container">
                        <b-row><img src="../assets/up.png" alt="up" width="50px" @click="vote('upvote', getDetail._id)"></b-row>
                        <b-row>
                            <h3 v-if="getDetail.upvotes.length !== undefined">{{getDetail.upvotes.length}}</h3>
                            <h3 v-if="getDetail.upvotes.length === undefined"> 0 </h3>
                        </b-row>
                        <b-row><img src="../assets/down.png" alt="down" width="50px" @click="vote('downvote', getDetail._id)"></b-row>
                    </div>
                </b-col>
                <b-col sm="10">
                    <b-row>
                        <p>{{getDetail.description}} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse reprehenderit qui totam aspernatur ullam. Quam consequatur expedita quod eligendi libero assumenda dolorem similique autem eaque repudiandae, eos suscipit vitae tempora!</p>
                    </b-row>
                    <b-row>
                        <b-row>
                        <b-col sm="9">
                            <b-row>
                                <b-col v-for="(item, index) in getDetail.tags" :key="index">
                                    <h6><b-badge variant="success">{{item}}</b-badge></h6>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col sm="3">
                            <b-row>
                                <p>{{getDetail.createdAt}}</p>
                                <b-col sm="6">
                                    <p></p>
                                    <p>{{getDetail.UserId}}</p>
                                    <img src="../assets/Hacktiv.png" alt="picture" width="50px">
                                    <p></p>
                                </b-col>
                                <!-- <b-col sm="6">
                                    <b-row>{{data.UserId}} seharusnya username</b-row>
                                    <b-row>Followers 90</b-row>
                                </b-col> -->
                            </b-row>
                        </b-col>
                    </b-row>
                    </b-row>
                </b-col>
            </b-row>
            <hr>
            <p v-b-tooltip.hover.v-info.right="'scroll me to see the answer'">Answer List</p>
            <div class="card example-1 scrollbar-ripe-malinka">
                <div class="card-body">
                    <hr>
                    <b-row v-for="(item, index) in AllComment" :key="index">
                        <!-- v-for="(item, index) in AllComment" :key="index" -->
                        <ListAnswer :datas="item"></ListAnswer>
                    </b-row>
                </div>
            </div>
            <hr>
            <div v-if="page === 'create'"  style="padding-top: 80px;">
                <CreateAnswer :idquestion="getDetail._id"></CreateAnswer>
            </div>
        </div>
    <!-- </div> -->
</template>

<script>
import CreateAnswer from '@/components/CreateComment.vue'
import ListAnswer from '@/components/UserAnswer.vue'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            page: '',
        }
    },
    computed:{
        ...mapState(['getDetail', 'AllComment'])
    },
    created(){
        this.page = ''
        
    },
    components:{
        CreateAnswer, ListAnswer
    },
    methods:{
        vote(value, id){
            console.log('ini adalah id: ', this.$store.state.getDetail)
            const data = {
                status: value,
                id: id
            }
            console.log('datanya nih: ', data)
            this.$store.dispatch('votes', data)
        },
        pages(){
            this.page = 'create'
        },
    }
}
</script>

<style scoped>
.scrollbar-deep-purple::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5;
border-radius: 10px; }

.scrollbar-deep-purple::-webkit-scrollbar {
width: 12px;
background-color: #F5F5F5; }

.scrollbar-deep-purple::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #512da8; }

.scrollbar-cyan::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5;
border-radius: 10px; }

.scrollbar-cyan::-webkit-scrollbar {
width: 12px;
background-color: #F5F5F5; }

.scrollbar-cyan::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #00bcd4; }

.scrollbar-dusty-grass::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5;
border-radius: 10px; }

.scrollbar-dusty-grass::-webkit-scrollbar {
width: 12px;
background-color: #F5F5F5; }

.scrollbar-dusty-grass::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-image: -webkit-linear-gradient(330deg, #d4fc79 0%, #96e6a1 100%);
background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%); }

.scrollbar-ripe-malinka::-webkit-scrollbar-track {
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-color: #F5F5F5;
border-radius: 10px; }

.scrollbar-ripe-malinka::-webkit-scrollbar {
width: 12px;
background-color: #F5F5F5; }

.scrollbar-ripe-malinka::-webkit-scrollbar-thumb {
border-radius: 10px;
-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
background-image: -webkit-linear-gradient(330deg, #f093fb 0%, #f5576c 100%);
background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%); }

.bordered-deep-purple::-webkit-scrollbar-track {
-webkit-box-shadow: none;
border: 1px solid #512da8; }

.bordered-deep-purple::-webkit-scrollbar-thumb {
-webkit-box-shadow: none; }

.bordered-cyan::-webkit-scrollbar-track {
-webkit-box-shadow: none;
border: 1px solid #00bcd4; }

.bordered-cyan::-webkit-scrollbar-thumb {
-webkit-box-shadow: none; }

.square::-webkit-scrollbar-track {
border-radius: 0 !important; }

.square::-webkit-scrollbar-thumb {
border-radius: 0 !important; }

.thin::-webkit-scrollbar {
width: 6px; }

.example-1 {
position: relative;
overflow-y: scroll;
height: 200px; }
</style>
