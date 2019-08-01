<template>
    <div>
        <b-row>
            <b-col sm="1">
                <b-row>{{data.upvotes.length + data.downvotes.length}} Votes</b-row>
                <b-row>0 Answer</b-row>
                <b-row>{{data.views.length}} Views</b-row>
            </b-col>
            <b-col sm="11">
                <b-row>
                    <h3 @click="toDetail(data._id)">{{data.title}}</h3>
                    <p><b>{{data.description}}</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quia autem, voluptatem libero iure aut harum hic inventore deleniti dicta sint ea nesciunt maiores velit temporibus delectus voluptas dolore distinctio.</p>
                </b-row>
                <b-row>
                    <b-col sm="9">
                        <b-row>
                            <b-col v-for="(item, index) in data.tags" :key="index">
                                <h6><b-badge variant="success" @click="tag(item)">{{item}}</b-badge></h6>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col sm="3">
                        <b-row id="prof">
                            <p @click="deleteQuestion(data._id)" v-b-popover.hover="'you can only delete yours question'">delete this question</p>
                            <b-col sm="6">
                                <p></p>
                                <p>{{data.UserId.username}}</p>
                                <img src="https://icons-for-free.com/iconfiles/png/512/svg+overflow+stack+stackoverflow+icon-1320190544408950965.png" alt="picture" width="50px">
                                <p></p>
                            </b-col>
                            <!-- <b-col sm="6">
                                <b-row>{{data.UserId}} seharusnya username</b-row>
                                <b-row>Followers 90</b-row>
                            </b-col> -->
                        </b-row>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data(){
        return{

        }
    },
    methods:{
        toDetail(id){
            this.$store.dispatch('votes', id)
            this.$store.dispatch('getQuestionById', id)
            this.$router.push('/detail/'+id)
        },
        tag(value){
            this.$store.dispatch('searchTag', value)
            this.$router.push('/tag')
        },
        deleteQuestion(id){
            this.$store.dispatch('deleteQuestion', id)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
</style>
