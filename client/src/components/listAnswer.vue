<template>
    <div class="list-answer">
        <b-container>
            <b-row>
                <b-col cols="10">
                    <!-- {{answer}} -->
                    <h5>{{answer.title}}</h5>
                    <button v-if="answer.UserId.email == email" @click="deleteAnswer(answer._id)"><i class="fa fa-trash"></i></button>
                    <p> Answer : </p>
                    <br>
                    <p v-html="answer.description"></p>
                    <br/>
                    <span>Answered by : {{answer.UserId.firstname}} {{answer.UserId.lastname}}</span>
                </b-col>
                <b-col cols="2">
                    <div class="button-vote">
                        <button class="button-click" @click="upvoteanswer(answer)"><i class="fa fa-chevron-up"></i></button>
                        <p class="total-vote">{{answer.upVote.length - answer.downVote.length}}</p>
                        <!-- {{answerQues}} -->
                        <button class="button-click" @click="downvoteanswer(answer._id)"><i class="fa fa-chevron-down"></i></button>
                    </div>

                </b-col>
            </b-row>
        </b-container>
        <hr>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from '../config/axios.js'

export default {
    props : ['answer'],
    data(){
        return {
            email : ""
        }
    },
    methods : {
        upvoteanswer(value){
            console.log("kepencet upvote answer");
            
            axios({
                method : `PATCH`,
                url : `/answers/upvote/${value._id}`,
                headers : {token : localStorage.token}
            })
            .then(({data}) => {
                console.log(data);
                    this.$store.dispatch('getAllAnswer', value.QuestionId)

            })
            .catch(err => {
                console.log(err);
            })
        },
        downvoteanswer(id){
          console.log("kepencet downvote answer");
          
            axios({
                method : `PATCH`,
                url : `/answers/downvote/${id}`,
                headers : {token : localStorage.token}
            })
            .then(({data}) => {
                console.log(data);
                this.$store.dispatch('getOneAnswer', id)
            })
            .catch(err => {
                console.log(err);
            })
        },
        deleteAnswer(id){
            console.log(id);
            console.log(this.answer.QuestionId, "question id, .,.,.,.,.,.,.,");
            let payload = {
                idAnswer : id,
                idQuestion : this.answer.QuestionId
            }
            console.log("triggered button delete answer");
            this.$store.dispatch('deleteAnswer', payload)
        }
    },
    created(){
        // console.log(this.answerQues, "ini answer quessssssss");
        this.email = localStorage.email
    },
    computed : {
        ...mapState(['upVoteAnswer', 'downVoteAnswer', 'answerQues'])
    }
}
</script>

<style scoped>
    .button-vote {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .total-vote {
        text-align: center;
        margin-top : 10px; 
    }
    .button-click {
        text-align: center;
        border: none;
        background-color: white;
        font-size: 18px;
    }
</style>
