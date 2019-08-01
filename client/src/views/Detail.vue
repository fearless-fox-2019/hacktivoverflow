<template>
   <div class="container-fluid" style="margin-top: -2%; background-color: lightgray; height:710px; max-height: 710;">           
        <h4 style="float: right; margin-top: 1%;"> Created by: {{userCreated}} </h4> 
        <h1 style="margin-left: 2%; margin-top: 2%;">{{post.title}}</h1>
        <p class="card-text" style="color: black; font-size: 12px; float:right;">{{new Date(post.createdAt) | moment('from', 'now')}}</p>
        <h4 style="margin-left: 3%;"> {{post.description}} </h4>
        <hr style="background-color: white"> 
        <h5 style="margin-left: 2%;"> Comments: </h5>
        <h4 style="margin-left: 2%; color: gray" v-if="$store.state.commentsByPostId.length < 1"> No comments, please add some </h4>
        <div v-else class="container" style="max-height: 500px; overflow: scroll;">
            <card v-for="(comment, index) in $store.state.commentsByPostId" :key="index" :data='comment' :status='false' style="margin-bottom: 1%;"/>
        </div>
        <button style="width: 80%; margin-bottom: -3%; margin-left:10%; background-color: #F19633; color: white;" data-toggle="modal" data-target="#commentModal" class="btn">Add Comment</button>
        <!-- ADD MODALS -->
        <div class="modal fade" id="commentModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title" style="margin-left: 1%">Add New Comment</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body" style="text-align: left;">
                        <form @submit.prevent="createComment()">
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" v-model="addComment.title">
                            </div>
                            <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                <label for="desc">Description:</label>
                                <textarea type="text" class="form-control" v-model="addComment.description" />
                                <button class="btn" type="submit" style="margin-top: 3%; width: 100%; background-color: #F19633; color:white">Add New Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import card from '@/components/card.vue'
export default {
    name: 'Detail',
    components: {
        card
    },
    data () {
        return {
            idPost: localStorage.getItem('idPost'),
            post : {},
            userCreated: '',
            comment: [],
            addComment: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        retrievePostById (idPost) {
            axios({
                method: "GET",
                url: `http://13.250.47.26:3000/posts/id/${idPost}`,
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            .then(({data}) => {
                this.post = data
                this.userCreated = data.userId.name
            })
            .catch(err => {
                console.log(err)
            })
        },
        createComment () {
            let obj = {
                title: this.addComment.title,
                description: this.addComment.description,
                upvotes: [],
                downvotes: [],
                postId: this.post._id
            }
            console.log(obj)
            this.$store.dispatch('newComment',obj)
            this.$store.dispatch('retrieveCommentByPostId', this.idPost)
            // this.retrievePostById(this.idPost)
            this.addComment.title = ''
            this.addComment.description = ''
        },
    },
    created () {
        this.retrievePostById(this.idPost)
        this.$store.dispatch('retrieveCommentByPostId', this.idPost)
    }
}
</script>

<style>

</style>
