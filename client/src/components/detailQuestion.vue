<template>
    <div class="container" style="margin-top: 7%;">

        <article class="media">
            <!-- Question section -->
            <div id="vote-box" class="media-left" style="width: 50px">
                <p>
                    <i class="fas fa-caret-up" id="arrow"></i>
                </p>
                <p id="totalVote">
                    {{currentQuestion.upvotes.length-currentQuestion.downvotes.length}}
                </p>
                <p>
                    <i class="fas fa-caret-down" id="arrow"></i>
                </p>
            </div>
            <div class="media-content">
                <div class="content">
                    <p> <strong>{{currentQuestion.title}}</strong>  </p>

                    <article v-html="currentQuestion.description" class="media"></article>
                    <br>
                    <b-taglist>
                        <b-tag v-for="tag in currentQuestion.tags" :key="tag" type="is-info" > {{tag}}</b-tag>
                    </b-taglist>
                    <div id="footer" style="margin-top: -10px">
                        <p><small>Asked by: {{currentQuestion.userId.name}} · {{questionTime}}</small></p>
                        <div v-if="loggedUser == currentQuestion.userId._id" style="width: 80px; display: flex; justify-content: space-around">
                            <a @click="toEditQuestion"><i class="fas fa-edit"></i></a>
                            <a @click="removeQuestion"><i class="fas fa-trash"></i></a>
                        </div>
                    </div>
                </div>

                <formQuestion 
                    v-if="edit === 'question'"
                    :question="currentQuestion"
                    @gotData="saveQuestion"
                ></formQuestion>

                <!-- Answer Section -->
                <article v-for="answer in currentQuestion.answers" :key="answer._id"  class="media" style="margin-top: -10px">
                <div id="vote-box" class="media-left" style="width: 50px">
                    <p>
                        <i class="fas fa-caret-up" id="arrow"></i>
                    </p>
                    <p id="totalVote">
                        {{answer.upvotes.length-answer.downvotes.length}}
                    </p>
                    <p>
                        <i class="fas fa-caret-down" id="arrow"></i>
                    </p>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p><strong>{{answer.title}}</strong> </p>
                        <article id="content-txt" v-html="answer.description" class="media"></article>
                        <div id="footer">
                            <p><small>Answered by: {{answer.userId.name}} · {{questionTime}}</small></p>
                            <div v-if="loggedUser == answer.userId._id" style="width: 80px; display: flex; justify-content: space-around">
                                <a @click="toEditAnswer"><i class="fas fa-edit"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <formAnswer
                    v-if="edit === 'answer'"
                    :answer="answer"
                    @gotData="saveAnswer"
                    @cancel="close"
                ></formAnswer>
                </article>
            </div>
        </article>
        <!-- Post answer Section -->
        <article  class="media">
            <div class="media-left">
                <p>Your Answer:</p>
            </div>
            <div class="media-content">
                <div class="field">
                <p class="control">
                    <b-field  class="has-text-left" label="Title">
                        <b-input v-model="newAnswer.title"></b-input>
                    </b-field>
                    <b-field  class="has-text-left" label="Description"></b-field>
                    <wysiwyg v-model="newAnswer.description" />
                </p>
                </div>
                <div class="field">
                <p class="control">
                    <b-button @click="submitAnswer" type="is-info">Post Your Answer</b-button>
                </p>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import formQuestion from '@/components/formQuestion.vue'
import formAnswer from '@/components/formAnswer.vue'

export default {
    name: 'detailQuestion',
    components:{
        formQuestion,
        formAnswer
    },
    data(){
        return {
            edit:'',
            loggedUser:"",
            questionTime:'',
            newAnswer:{
                title:'',
                description:''
            }
        }
    },
    methods:{
        ...mapActions(['getCurrentQuestion', 'createAnswer', 'deleteQuestion', 'updateQuestion']),

        submitAnswer(){
            let data={
                title: this.newAnswer.title,
                description: this.newAnswer.description,
                questionId: this.currentQuestion._id
            }

            this.createAnswer(data)
            this.newAnswer.title= ''
            this.newAnswer.description= ''

        },
        toEditQuestion(){
            this.edit= 'question'
        },
        toEditAnswer(){
            this.edit= 'answer'
        },
        saveQuestion(data){
            this.edit= '',
            this.updateQuestion(data)
        },
        saveAnswer(data){
            this.edit=''
            console.log(data)
        },
        close(){
            this.edit=''
        },
        removeQuestion(){
            Swal.fire({
                text: "Are you sure delete this question?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sure!'
            }).then((result) => {
            if (result.value) {
                this.deleteQuestion(this.currentQuestion._id)
                }
            })
        }
    },
    computed:{
        ...mapState(['currentQuestion'])
    },
    created(){
        this.getCurrentQuestion()
        this.questionTime= moment(this.currentQuestion.createdAt).fromNow()
        this.loggedUser= localStorage.userId
    }
}
</script>

<style scoped>
    #vote-box{
        display: flex;
        flex-direction: column;
        text-align: center
    }
    #arrow{
        font-size: 30px
    }
    #totalVote{
        font-size: 24px;
    }
    #footer{
        display: flex;
        justify-content:space-between;
    }
    #content-text{
        margin-bottom: 5px
    }
</style>
