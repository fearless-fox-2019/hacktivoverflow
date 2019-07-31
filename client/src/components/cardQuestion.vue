<template>
    <div class="card ">
        <div class="card-content">
            <div class="content columns">
                <div class="column" style="border-right: 2px solid black">
                    <p>Votes</p>
                    <p>{{question.upvotes.length-question.downvotes.length}}</p>
                </div>
                <div class="column" style="border-right: 2px solid black">
                    <p>Answers</p>
                    <p>{{question.answers.length}}</p>
                </div>
                <div class="column is-10 is-paddingless " style="margin-top: 10px; margin-left: 15px">
                    <h5 id="title" @click="toDetail" class="title is-5 has-text-left">{{question.title}}</h5>
                    <div id="footer">
                        <div class="tags">
                            <span v-for="(tag, index) in question.tags" 
                                :key="index"
                                @click.prevent="searchTag(tag)" 
                                class="tag is-info">
                                <a style="color: white">{{tag}}</a>
                            </span>
                        </div>
                        <p id="author">Asked by: {{question.userId.name}} - {{time}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name:'cardQuestio',
    props:['question'],
    data(){
        return {
            time:''
        }
    },
    methods:{
        toDetail(){
            this.$router.push(`/detail/${this.question._id}`)
        },
        searchTag(tag){
            console.log('ketrigger', tag)
        }
    },
    created(){
        this.time= moment(this.question.createdAt).fromNow()
    }
}
</script>

<style scoped>
    .title:hover{
        cursor: pointer
    }
    #footer{
        width: 600px;
        display: flex;
        justify-content: space-between;
        margin-bottom: -10px
    }
    #author{
        font-size: 12px;
        font-style: italic
    }
</style>
