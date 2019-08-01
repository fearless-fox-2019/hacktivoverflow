<template>
    <div class="container">
        <!-- {{datas}} -->
        <b-row>
            <b-col sm="3">
                <div class="container">
                    <b-row><img src="../assets/up.png" alt="up" width="50px" @click="vote('upvote', datas._id)"></b-row>
                    <b-row>
                        <!-- <h3 v-if="getDetail.upvotes.length !== undefined">{{getDetail.upvotes.length}}</h3> -->
                        <!-- v-if="getDetail.upvotes.length === undefined" -->
                        <h3 > 0 </h3>
                    </b-row>
                    <b-row><img src="../assets/down.png" alt="down" width="50px" @click="vote('downvote', datas._id)"></b-row>
                </div>
            </b-col>
            <b-col sm="9">
                <h4> {{datas.title}}</h4>
                <h5>Answer : </h5>
                <p>{{datas.description}}</p>
                <p>{{datas.createdAt}}</p>
            </b-col>
        </b-row>
        <hr>
    </div>
</template>

<script>
export default {
    props: ['datas'],
    list(){
        return{}
    },
    created(){
        this.$store.dispatch('getAllCommentById', {id: datas.QuestionId} )
    },
    methods:{
        vote(value, id){
            console.log('ini adalah id: ', this.datas)
            const data = {
                status: value,
                id: id
            }
            console.log('datanya nih: ', data)
            this.$store.dispatch('votes', data)
        },
    }

}
</script>

<style>

</style>
