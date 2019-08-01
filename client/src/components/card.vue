<template>
    <div class="card col-12" style="max-height: 148px;"> 
        <div class="card-body row" style="padding: 15px; margin-right:-5%;">
            <div class="col-1" style="background-color:#E4E7ED; max-height: 105px;">
                <!-- <a class="nav-link pointer" style="color: #F19633; margin-top:5%; text-align: center;" v-show="$store.state.isLogin && flagUp" @click="upvote(data._id, status)"><i class="fas fa-chevron-up"></i></a> -->
                <a class="nav-link pointer" style="color: black; margin-top:5%; text-align: center;" v-show="$store.state.isLogin" @click="upvote(data._id, status)"><i class="fas fa-chevron-up"></i></a>
                <a class="nav-link pointer" style="color: black; margin-top:5%; text-align: center;" v-show="!$store.state.isLogin" data-toggle="modal" data-target="#signinModal"><i class="fas fa-chevron-up"></i></a>
                <p class="nav-link" style="color: black; margin-top:-10%; margin-bottom:-10%; text-align: center; padding: 0;">{{ data.upvotes.length - data.downvotes.length }}</p>
                <a class="nav-link pointer" style="color: black; text-align: center;" v-show="$store.state.isLogin" @click="downvote(data._id, status)"><i class="fas fa-chevron-down"></i></a>
                <!-- <a class="nav-link pointer" style="color: #F19633; text-align: center;" v-show="$store.state.isLogin && flagDown" @click="downvote(data._id, status)"><i class="fas fa-chevron-down"></i></a> -->
                <a class="nav-link pointer" style="color: black; text-align: center;" v-show="!$store.state.isLogin" data-toggle="modal" data-target="#signinModal"><i class="fas fa-chevron-down"></i></a>
            </div>
            <div class="col-10 row" v-if="data.userId == $store.state.userId && $store.state.isLogin == true">                
                <h4 class="card-title col-9">{{data.title}}</h4>
                <p class="card-text col-3" style="color: gray; font-size: 12px; text-align: right;" > {{new Date(data.createdAt) | moment('from', 'now')}} </p>
                <p class="card-text text-truncate col-10">{{data.description}}</p>
                <a class="card-link pointer col-2" style="color: #2232B3; text-align:right; margin-top: -3%;" v-show="status" @click="gotoDetail(data._id)">Detail</a>
                <div class="col-12 row" style="max-height: 28px; overflow: auto; margin-left: 1%; margin-top: -2%; padding: 0;">
                    <div class="col-2 pointer" v-for="(tag, index) in data.tags" :key="index" style="background-color:#F19633; margin-left: 1%; color: white; border-radius: 10px;">
                        <p class="card-text text-truncate" style="text-align:center;"> {{tag}} </p>
                    </div>
                </div>
            </div>
            <div v-else class="col-11 row">                
                <h4 class="card-title col-9">{{data.title}}</h4>
                <p class="card-text col-3" style="color: gray; font-size: 12px; text-align: right;" > {{new Date(data.createdAt) | moment('from', 'now')}} </p>
                <p class="card-text text-truncate col-10">{{data.description}}</p>
                <a class="card-link pointer col-2" style="color: #2232B3; text-align:right; margin-top: -3%;" v-show="status" @click="gotoDetail(data._id)">Detail</a>
                <div class="col-12 row" style="max-height: 28px; overflow: auto; margin-left: 1%; margin-top: -2%; padding: 0;">
                    <div class="col-2 pointer" v-for="(tag, index) in data.tags" :key="index" style="background-color:#F19633; margin-left: 1%; color: white; border-radius: 10px;">
                        <p class="card-text text-truncate" style="text-align:center;"> {{tag}} </p>
                    </div>
                </div>
            </div>
            <div class="col-1" style="background-color: #E4E7ED; text-align: center; padding: 1%;" v-if="data.userId == $store.state.userId && $store.state.isLogin == true">
                <a class="nav-link pointer" style="color: black;" @click="gotoEdit(data)" data-toggle="modal" :data-target="'#editModal'+data._id"><i class="fas fa-edit" style="font-size: 23px;"></i></a>
                <a class="nav-link pointer" style="color: black;"  v-show="status" @click="remove(data._id)"><i class="fas fa-trash" style="font-size: 23px;"></i></a>
            </div>
            <!-- EDIT MODALS POST -->
            <div class="modal fade" :id="'editModal'+data._id" v-if="status">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title" style="margin-left: 1%">Edit</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: left;">
                            <form @submit.prevent="editPost(status)">
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Title:</label>
                                    <input type="text" class="form-control" v-model="post.title">
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="desc">Description:</label>
                                    <textarea type="text" class="form-control" v-model="post.description" />
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Tags:</label>
                                    <input type="text" class="form-control" v-model="post.tags">
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: #F19633; color: white;">Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- EDIT MODALS COMMENTS -->
            <div class="modal fade" :id="'editModal'+data._id" v-if="!status">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title" style="margin-left: 1%">Edit</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: left;">
                            <form @submit.prevent="editPost(status)">
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Title:</label>
                                    <input type="text" class="form-control" v-model="post.title">
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="desc">Description:</label>
                                    <textarea type="text" class="form-control" v-model="post.description" />
                                    <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: #F19633; color: white;">Edit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'card',
    props: {
        data: Object,
        status: Boolean
    },
    data () {
        return {
            post: {
                answer: [],
                description: '',
                tags: [],
                downvotes: [],
                title: '',
                upvotes: [],
            },
            flagUp: false,
            flagDown: false,
        }
    },
    created () {
        this.$store.dispatch('retrievePosts')
        // this.checkUp()
    },
    computed: {
      ...mapState(['name','posts','mypost','isLogin','upvotePost','downvotePost'])
    },
    methods : {
        remove (id) {
            this.$store.dispatch('deletePost', id)
        },
        gotoEdit (data) {
            this.post = data
        },
        editPost (status) {
            let obj = {post: this.post, status: this.status}
            this.$store.dispatch('editPost', obj)
        },
        gotoDetail (id) {
            localStorage.setItem('idPost', id)
            this.$router.push('/detail')
        },
        upvote(id, status) {
            if (status) { 
                this.$store.dispatch('upvotePost', id)
                // console.log(this.flagUp, 'ini flagup')
                // this.checkUp()
                // console.log(this.flagUp, 'ini flagup2')
            } else if (!status) {
                this.$store.dispatch('upvoteComment', id)
            }
        },
        downvote(id, status) {
            if (status)  {
                this.$store.dispatch('downvotePost', id)
            } else if (!status) {
                this.$store.dispatch('downvoteComment', id)
            }
        },
        // checkUp() {
        //     if(this.data.upvotes.includes(this.$store.state.userId)) {
        //         this.flagUp = this.data.upvotes.includes(this.$store.state.userId)
        //         console.log(this.flagUp, 'ini dari check', this.data.title);
        //     } else if (this.data.downvotes.includes(this.$store.state.userId)) {
        //         this.flagDown = this.data.downvotes.includes(this.$store.state.userId)
        //         console.log(this.flagDown, 'ini dari check', this.data.title);
        //     }
        // }
    }
}
</script>

<style>
    .pointer {cursor: pointer;}
</style>
