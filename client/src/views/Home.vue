<template>
    <div class="container-fluid row" style="padding: 0;">
        <div class="col-9" style="height:710px; background-color: #E4E7ED;">
            <h3 style="margin-left: 2%; margin-top: 2%;">Tags List:</h3>
            <div class="pointer row" style="margin-left: 2%; max-height: 75px; overflow: scroll;">
                <div class="col-2" v-for="(tag, index) in $store.state.tags" :key="index" style="background-color:white; margin-right: 1%; margin-bottom: 1%; color: #F19633; border-radius: 10px; padding: 0;">
                    <p class="card-text text-truncate" style="text-align:center;" @click.prevent="filter(index, 'tags')"> {{tag}} </p>
                    <div v-show="isLogin" style="background-color: #F19633; text-align: center; padding: 0; margin-top: -11px; border-radius: 10px;" @click.prevent="watchTag(index)">
                        <a style="color: white;"> <i class="fas fa-eye" style="font-size: 16px; color: white;"></i> Watch Tag</a>
                    </div>
                </div>
            </div>
            <h3 style="margin-left: 2%; margin-top: 1%;">Post:</h3>
            <h5 v-if="posts.length < 1" style="margin-left: 5%; margin-top: 3%; color: gray;"> No post, lets add some... </h5>
            <div style="max-height: 500px; overflow: scroll;" v-if="isFilterClicked">
                <div class="row" style="margin: 2%;" v-for="(post, index) in $store.state.postsByTag" :key="index">
                    <card :data='post' :status='true'/>
                </div>
            </div>
            <div style="max-height: 500px; overflow: scroll;" v-if="!isFilterClicked">
                <div class="row" style="margin: 2%;" v-for="(post, index) in $store.state.posts" :key="index">
                    <card :data='post' :status='true'/>
                </div>
            </div>
        </div>
        <div class="col-3" style="text-align: center; padding: 0;">
            <h2 class="text-truncate" style="margin-top: 5%;">{{name}}</h2>
            <button class="btn" data-toggle="modal" data-target="#addModal" style="background-color: #F19633; color: white; margin-left: 3%; width: 96%;" v-show="isLogin">Create Post</button>
            <!-- ADD MODALS -->
            <div class="modal fade" id="addModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title" style="margin-left: 1%">Add New Post</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <!-- Modal body -->
                        <div class="modal-body" style="text-align: left;">
                            <form @submit.prevent="createPost()">
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Title:</label>
                                    <input type="text" class="form-control" v-model="addPost.title">
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="desc">Description:</label>
                                    <textarea type="text" class="form-control" v-model="addPost.desc" />
                                </div>
                                <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                                    <label for="title">Tags:</label>
                                    <input type="text" class="form-control" v-model="addPost.tags">
                                    <button class="btn" type="submit" style="margin-top: 3%; width: 100%; background-color: #F19633; color: white;">Add New Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <hr v-show="isLogin">
            <h5 style="text-align:left; margin-left:3%" v-show="isLogin">Watched Tag(s): </h5>
                <h6 v-if="$store.state.userTag.length == 0" style="margin-left:0%;"> No Watched Tag, please add some... </h6>
                <div v-show="isLogin" v-else class="pointer row" style="margin-left: 10%; max-height: 75px; overflow: scroll;">
                    <div class="col-3" v-for="(tag, index) in $store.state.userTag" :key="index" style="background-color:#F19633; margin-right: 5%; margin-bottom: 2%; color: white; border-radius: 10px; max-width: 150px; padding: 0;">
                        <p class="card-text text-truncate" style="text-align:center;" @click.prevent="filter(index, 'myTags')"> {{tag}} </p>
                        <div @click.prevent="removeTag(index)" style="background-color: #E4E7ED; text-align: center; padding: 0; margin-top: -11px; border-radius: 10px;">
                            <a style="color: white;"> <i class="fas fa-times" style="font-size: 16px; color: black;"></i></a>
                        </div>
                    </div>
                </div>
            <hr>
            <h5 style="text-align:left; margin-left:3%" v-show="isLogin">My Post: </h5>
            <div class="row" style="margin: 3%; max-height: 400px; overflow: scroll; padding: 0;" v-show="isLogin">
                <h6 v-if="mypost.length < 1" style="margin-top: 2%; color: gray;"> You have no post.</h6>
                <h6 v-if="mypost.length < 1" style="margin-top: 2%; color: gray;"> Feel free to ask... </h6>
                <div v-else class="col-12" style="margin: 0.3%; text-align: left; padding:0;" v-for="(post, index) in $store.state.mypost" :key="index">
                    <mycard :data='post' :status='true'/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import card from '@/components/card'
import mycard from '@/components/mycard'
import {mapState} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
        addPost: {
            title: '',
            desc: '',
            tags: []
        },
        isWatchClicked: false,
        isRemoveClicked: false,
        isFilterClicked: false,
        indexTag: 0
    }
  },
  components: {
    card,
    mycard
  },
  methods: {
    createPost () {
        let obj = {
            title: this.addPost.title,
            description: this.addPost.desc,
            tags: this.addPost.tags,
            upvotes: [],
            answer: [],
            downvotes: []
        }
        this.$store.dispatch('newPost',obj)
        this.addPost.title = ''
        this.addPost.desc = ''
        this.addPost.tags = ''
    },    
    watchTag(index) {
        this.isWatchClicked = true
        this.indexTag = index
        let src = null
        this.filterTag(src)
    },
    removeTag(index) {
        this.isRemoveClicked = true
        this.indexTag = index
        let src = null
        this.filterTag(src)
    },
    filter(index, src) {
        this.isFilterClicked = true
        this.indexTag = index
        this.filterTag(src)
    },
    filterTag(src) {
        if (src === null) {
            if (this.isWatchClicked) {
                this.isWatchClicked = false
                this.$store.dispatch('watchTag', this.$store.state.tags[this.indexTag])
            } else if (this.isRemoveClicked) {
                this.isRemoveClicked = false
                this.$store.dispatch('deleteTag', this.indexTag)
            }  
        } else {
            let obj = {
                index: this.indexTag,
                src: src
            }
            this.$store.commit('filteredByTag', obj)
        }
    }
  },
  computed: {
      ...mapState(['name','posts','mypost','isLogin'])
  },
  created () {
    this.$store.dispatch('retrievePosts')
    this.$store.dispatch('retrieveMyPosts')
    this.$store.dispatch('userTag')
  }
}
</script>

<style>
</style>
