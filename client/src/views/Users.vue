<template>
    <div>
        <h1>Welcome into HacktivOverflow dashboard all user</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus officia, iste minus sint delectus nulla corporis. Architecto, facere fugit earum minima totam, doloremque nesciunt beatae ducimus veniam harum nostrum eligendi!</p>
        <b-row>
            <b-col v-for="user in allUsers" :key="user._id">
                <b-card>
                    <b-col sm="3">
                        <img width="50px" src="https://icons-for-free.com/iconfiles/png/512/svg+overflow+stack+stackoverflow+icon-1320190544408950965.png" alt="">
                    </b-col>
                    <b-col>
                        <p @click="allQue(user._id)">{{user.username}}</p>
                    </b-col>
                </b-card>
            </b-col>
        </b-row>
        <div style="padding-top: 100px;">
            <div class="card example-1 scrollbar-ripe-malinka">
                <div class="card-body">
                    <div v-if="page == true">
                        <QueUser :datas="QueUser"></QueUser>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import QueUser from '@/components/ByUserPage.vue'
export default {
    data(){
        return{
            page: false
        }
    },
    components:{
        QueUser
    },
    computed:{
        ...mapState(['allUsers', 'QueUser'])
    },
    methods:{
        allQue(id){
            console.log('baru masuk allQue', id)
            this.page = true
            this.$store.dispatch('getByUser', id)
            this.$router.push('/users/'+id)
        }
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
