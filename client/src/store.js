import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    name: '',
    posts: [],
    mypost: [],
    userId: '',
    commentsByPostId: [],
    upvotePost: [],
    downvotePost: [],
    tags: [],
    userTag: [],
    postsByTag: []
  },
  mutations: {
    // POSTS
    checkLogin (state) {
      if (localStorage.getItem('access_token')) {
        state.isLogin = true
        state.name = localStorage.getItem('name')
        state.userId = localStorage.getItem('userId')
      } else {
        state.isLogin = false
        state.name = 'Visitor'
        state.userId = false
      }
    },
    retrievePosts (state, data) {
      state.posts = data
    },
    retrieveMyPosts (state, data) {
      state.mypost = data
    },
    retrieveCommentByPostId (state, data) {
      state.commentsByPostId = data
    },
    filteredByTag(state, obj) {
      // state.postsByTag = state.posts
      let filter
      if (obj.src === 'tags') {
        filter = state.posts.filter(post => {
          return post.tags.includes(state.tags[obj.index])
        })
      } else if (obj.src === 'myTags') {
        filter = state.posts.filter(post => {
          return post.tags.includes(state.userTag[obj.index])
        })
      }

      if (filter.length === 0) state.postsByTag = state.posts
        else return state.postsByTag = filter
    },
    // UPVOTE & DOWNVOTE
    upvotePost(state, data) {
      state.upvotePost = data
    },
    downvotePost(state, data) {
      state.downvotePost = data
    },
    // TAGS
    retrieveTags(state) {
      state.tags = []
      for (let i = 0; i < state.posts.length; i++) {
          for (let j = 0; j < state.posts[i].tags.length; j++) {
              state.tags.push(state.posts[i].tags[j])
          }
      }
      state.tags.sort()
      state.tags = [...new Set(state.tags)]
    },
    userTag(state, data) {
      state.userTag = data.watchedTags.sort()
    }
  },
  actions: {
    // USERS
    signIn(context, payload) {
      axios({
          method: "POST",
          url: `http://localhost:3000/users/signin`,
          data: payload
      })      
      .then(({data}) => {
        $('#signinModal').modal('hide'); $('.modal-backdrop').remove()
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('userId', data.id)
        context.commit('checkLogin')
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        this.dispatch('userTag')
        Swal.fire({
          title: `Welcome back ${data.name}!`,
          type: 'success'
        })
      })
      .catch(({response}) => {
        $('#signinModal').modal('hide'); $('.modal-backdrop').remove()
        Swal.fire({
          title: 'Failed to signin!',
          text: `${response.data.message}`,
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }) 
    },
    signUp(context, payload) {
      axios({
        method: "POST",
        url: `http://localhost:3000/users/signup`,
        data: payload,
      })   
      .then(({data}) => {
        $('#signupModal').modal('hide');
        $('#signinModal').modal('show');
        Swal.fire({
          title: `Signup with username ${payload.name}!`,
          type: 'success'
        })   
      })
      .catch(({response}) => {
        $('#signupModal').modal('hide'); $('.modal-backdrop').remove()
        Swal.fire({
          title: 'Failed to signup!',
          text: `${response.data.message}`,
          type: 'error',
          confirmButtonText: 'Ok'
        })
      })
    },
    watchTag(context, payload) {
      axios({
        method: "PATCH",
        url: `http://localhost:3000/users/savetag`,
        data: { tag: payload },
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        this.dispatch('userTag')
        Swal.fire({
          title: `Watched tag!`,
          type: 'success'
        })   
      })
      .catch(({response}) => {
        Swal.fire({
          title: 'Failed to watch tag!',
          text: `${response.data.message}`,
          type: 'error',
          confirmButtonText: 'Ok'
        })
      })
    },
    userTag(context) {
      axios({
        method: "GET",
        url: `http://localhost:3000/users`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        context.commit('userTag', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    deleteTag(context, payload) {
      Swal.fire({
        title: 'Are you sure to remove watched tag?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, remove it!'
      })
      .then((result) => {
        if (result.value) {
          axios({
            method: "PATCH",
            url: `http://localhost:3000/users/deletetag`,
            data: { 'index': payload },
            headers: {
              'access_token': localStorage.getItem('access_token')
            }
          })   
          .then(({data}) => {
            this.dispatch('userTag')
            Swal.fire({
              title: `Delete watched tag!`,
              type: 'success'
            })   
          })
          .catch(({response}) => {
            Swal.fire({
              title: 'Failed to delete watched tag!',
              text: `${response.data.message}`,
              type: 'error',
              confirmButtonText: 'Ok'
            })
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
    // POSTS
    newPost(context, payload) {
      payload.tags = payload.tags.split(',')
      payload.tags = [...new Set(payload.tags)]
      axios({
        method: "POST",
        url: `http://localhost:3000/posts`,
        data: payload,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        $('#addModal').modal('hide'); $('.modal-backdrop').remove()
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
        Swal.fire({
          title: `Create a new post!`,
          type: 'success'
        })   
      })
      .catch(({response}) => {
          Swal.fire({
            title: 'Failed to create a new post!',
            text: `${response.data.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
      })
    },
    retrievePosts({commit}) {
      axios({
        method: "GET",
        url: `http://localhost:3000/posts`,
      })   
      .then(({data}) => {
        commit('retrievePosts', data)
        commit('retrieveTags')
      })
      .catch(err => {
        console.log(err)
      })
    },
    retrieveMyPosts({commit}) {
      axios({
        method: "GET",
        url: `http://localhost:3000/posts/userId`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        commit('retrieveMyPosts', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    editPost(context, payload) {
      if (payload.status) {
        if (typeof payload.post.tags === 'string') {
          payload.post.tags = payload.post.tags.split(',')
          payload.post.tags = [...new Set(payload.post.tags)] 
        }
        Swal.fire({
          title: 'Are you sure edit post?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#343A40',
          cancelButtonColor: '#C82333',
          confirmButtonText: 'Yes, edit it!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: "PUT",
              url: `http://localhost:3000/posts/${payload.post._id}`,
              data: payload.post,
              headers: {
                'access_token': localStorage.getItem('access_token')
              }
            })   
            .then(({data}) => {
              $(`#editModal${payload.post._id}`).modal('hide'); $('.modal-backdrop').remove()
              $(`#editMyPostModal${payload.post._id}`).modal('hide'); $('.modal-backdrop').remove()
              Swal.fire({
                title: 'Success edit post!',
                type: 'success'
              })
              context.dispatch('retrievePosts')
              context.dispatch('retrieveMyPosts')
            })
            .catch(({response}) => {
              Swal.fire({
                title: 'Failed to edit post!',
                text: `${response.data.message}`,
                type: 'error',
                confirmButtonText: 'Ok'
              })
            })
          }
        })
      } else if (!payload.status) {
        Swal.fire({
          title: 'Are you sure edit comment?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#343A40',
          cancelButtonColor: '#C82333',
          confirmButtonText: 'Yes, edit it!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: "PUT",
              url: `http://localhost:3000/comments/${payload.post._id}`,
              data: payload.post,
              headers: {
                'access_token': localStorage.getItem('access_token')
              }
            })   
            .then(({data}) => {
              $(`#editModal${payload.post._id}`).modal('hide'); $('.modal-backdrop').remove()
              Swal.fire({
                title: 'Success edit comment!',
                type: 'success'
              })
              context.dispatch('retrievePosts')
              context.dispatch('retrieveMyPosts')
            })
            .catch(({response}) => {
              Swal.fire({
                title: 'Failed to edit post!',
                text: `${response.data.message}`,
                type: 'error',
                confirmButtonText: 'Ok'
              })
            })
          }
        })
      }
    },
    deletePost(context, payload) {
      Swal.fire({
        title: 'Are you sure to delete product?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#343A40',
        cancelButtonColor: '#C82333',
        confirmButtonText: 'Yes, delete it!'
      })
      .then((result) => {
        if (result.value) {
          axios({
            method: "DELETE",
            url: `http://localhost:3000/posts/${payload}`,
            headers: {
              'access_token': localStorage.getItem('access_token')
            }
          })   
          .then(({data}) => {
            this.dispatch('userTag')
            this.dispatch('retrievePosts')
            this.dispatch('retrieveMyPosts')
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
              )
            context.commit('retreieveTags')
          })
          .catch(({response}) => {
            Swal.fire({
              title: 'Failed to delete post!',
              text: `${response.data.message}`,
              type: 'error',
              confirmButtonText: 'Ok'
            })
          })
        }
      })
    },
    upvotePost(context, payload) {
      return axios({
        method: "PUT",
        url: `http://localhost:3000/posts/upvotes/${payload}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
      .then(({data}) => {
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts')
      })
      .catch(err => {
          console.log(err)
      })   
    },
    downvotePost(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/posts/downvotes/${payload}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        this.dispatch('retrievePosts')
        this.dispatch('retrieveMyPosts') 
      })
      .catch(err => {
      })
    },
    // COMMENTS
    newComment(context, payload) {
      axios({
        method: "POST",
        url: `http://localhost:3000/comments`,
        data: payload,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        let idPost = localStorage.getItem('idPost')
        let obj = {
          idComment : data._id
        }
        axios({
          method: "PUT",
          url: `http://localhost:3000/posts/addcomment/${idPost}`,
          data: obj,
          headers: {
            'access_token': localStorage.getItem('access_token')
          }
        })
        .then(comment => {
          $('#commentModal').modal('hide'); $('.modal-backdrop').remove()
          this.dispatch('retrieveCommentByPostId', idPost)
          Swal.fire({
            title: `Create a new comment!`,
            type: 'success'
          })  
        })
        .catch(({response}) => {
          Swal.fire({
            title: 'Failed to create a new comment!',
            text: `${response.data.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    retrieveCommentByPostId(context, payload) {
      axios({
        method: "GET",
        url: `http://localhost:3000/comments/postId/${payload}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        context.commit('retrieveCommentByPostId', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvoteComment(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/comments/upvotes/${payload}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        this.dispatch('retrieveCommentByPostId', data.data.postId)
      })
      .catch(err => {
        console.log(err)
      })
    },
    downvoteComment(context, payload) {
      axios({
        method: "PUT",
        url: `http://localhost:3000/comments/downvotes/${payload}`,
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })   
      .then(({data}) => {
        this.dispatch('retrieveCommentByPostId', data.postId)
      })
      .catch(err => {
        console.log(err)
      })
    },
  }
})
