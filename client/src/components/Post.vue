<template>
  <div>
    <b-card>
      <b-row>
        <div class="col-sm-1 d-flex justify-content-center">
          <b-input-group v-if="!this.$store.state.myPost">
            <b-input-group-append>
              <b-btn :class="{upvoteColorClass:upvoteColor}" type="submit" @click="upvote(detailPost._id)" variant="outline-secondary">&#8679;</b-btn>
            </b-input-group-append>

            <b-btn variant="outline-secondary">{{detailPost.upvote.length - detailPost.downvote.length}}</b-btn>
            <!-- <p>{{detailPost.upvote.length - detailPost.downvote.length}}</p> -->



            <b-input-group-prepend>
              <b-btn :class="{downvoteColorClass:downvoteColor}" type="submit" @click="downvote(detailPost._id)" variant="outline-secondary">&#8681;</b-btn>
            </b-input-group-prepend>
          </b-input-group>
        </div>

        <div class="col-sm-11 justify-content-center">
          <b-card :title="detailPost.title" class="heading">

            <b-card-text v-html="detailPost.content" v-if="this.$store.state.myPost" class="paragraph"></b-card-text>

            <p v-if="!this.$store.state.myPost" class="paragraph">Total Reply: {{detailPost.answerId.length}}</p>


          </b-card>

          <b-btn v-if="!this.$store.state.myPost" @click="details(detailPost._id)" variant="info" class="m-2">Details</b-btn>
          <!-- <a v-if="!this.$store.state.myPost" @click="details(detailPost._id)" href="#" class="card-link">Details</a> -->
          <b-btn v-if="!this.$store.state.myPost" @click="reply(detailPost._id)" variant="secondary" class="m-2">Quick Reply</b-btn>
          <!-- <a v-if="!this.$store.state.myPost" @click="reply(detailPost._id)" href="#" class="card-link">Quick Reply</a> -->
          <b-btn v-if="this.$store.state.myPost" @click="updatePost(detailPost._id)" variant="warning" class="m-2">Update</b-btn>
          <!-- <a v-if="this.$store.state.myPost" @click="updatePost(detailPost._id)" href="#" class="card-link">Update</a> -->
          <b-btn v-if="this.$store.state.myPost" @click="deletePost(detailPost._id)" variant="danger" class="m-2">Delete</b-btn>
          <!-- <a v-if="this.$store.state.myPost" @click="deletePost(detailPost._id)" href="#" class="card-link">Delete</a> -->

        </div>
      </b-row>
    </b-card>
  </div>
</template>

<script>
// const baseUrl = `http://localhost:3000`
const baseUrl = `http://35.240.247.85`

export default {
  props: ["detailPost"],
  data(){
    return {
      vote: "",
      num: 0,
      upvoteColor: false,
      downvoteColor: false
    }
  },
  methods: {
    updatePost(id){
      this.$router.push(`/updatePost/${id}`)
      this.$store.state.updatePost = id
    },
    downvote(id){
      if (this.upvoteColor === true){
        this.upvoteColor = false
      }else if (this.upvoteColor === false){
        this.downvoteColor = true
      }

      console.log('masuk, ini idnya downvote', id)
      axios({
          url: `${baseUrl}/api/posts/downvote/${id}`,
          method: "patch",
          dataType: "json",
          headers: {
            token: localStorage.getItem('token')
          }
          })
          .then(({data})=>{
            console.log(data)
            axios({
              url: `${baseUrl}/api/posts/findAll`,
              method: "get",
              dataType: "json",
              headers: {
                token: localStorage.getItem('token')
              }
            })
          .then(({data})=>{
            // console.log(data)
            this.$store.commit('allPosts', data)
            console.log(this.$store.state.allPosts)
            // this.$store.commit('changeLogin', true)
          })
          })
          .catch((err)=>{
            console.log('ini error')
            console.log(err)
          })
    },
    upvote(id){
      if (this.downvoteColor === true){
        this.downvoteColor = false
      }
      else if (this.downvoteColor === false){
        this.upvoteColor = true
      }
      
      console.log('masuk, ini idnya upvote', id)
      axios({
          url: `${baseUrl}/api/posts/upvotes/${id}`,
          method: "patch",
          dataType: "json",
          headers: {
            token: localStorage.getItem('token')
          }
          })
          .then(({data})=>{
            console.log(data)
            axios({
              url: `${baseUrl}/api/posts/findAll`,
              method: "get",
              dataType: "json",
              headers: {
                token: localStorage.getItem('token')
              }
            })
          .then(({data})=>{
            // console.log(data)
            this.$store.commit('allPosts', data)
            console.log(this.$store.state.allPosts)
            // this.$store.commit('changeLogin', true)
          })
            // Swal.fire('Post has been replied')
          })
          .catch((err)=>{
            console.log('ini error')
            console.log(err)
          })
    },
    details(id){
      this.$store.state.detailPost = id
      this.$router.push(`/detailPost`)
    },
    reply(id){
      (async function getFormValues () {
      const {value: formValues} = await Swal.fire({
        title: 'Quick Reply',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Title">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Reply" >',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]
        }
      })

      if (formValues && formValues[0] && formValues[1]) {
        let input = {
          title: formValues[0],
          content: formValues[1]
        }
        
        // Swal.fire(JSON.stringify(formValues))
        console.log('ini idnya', id)
        axios({
          url: `${baseUrl}/api/answers/create/${id}`,
          method: "post",
          dataType: "json",
          data: input,
          headers: {
            token: localStorage.getItem('token')
          }
          })
          .then(({data})=>{
            console.log(data)
            Swal.fire('Post has been replied')
          })
          .catch((err)=>{
            console.log('ini error')
            console.log(err)
          })
      }
      else {
        Swal.fire('Input and content cannot be empty')
      }
      })()
    },
    deletePost(id){
      console.log('clicked', id)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            url: `${baseUrl}/api/posts/${id}`,
            method: "delete",
            dataType: "json",
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({data})=>{
            this.$router.push(`/myPost`)
            this.$emit('refresh')
            Swal.fire(
              'Deleted!',
              'Your post has been deleted.',
              'success'
            )
          })
          .catch((err)=>{
            console.log(err)
          })
        }
      })
    }
  },
  created(){
    // console.log('=====',this.detailPost.upvote)
    for (let i=0; i<this.detailPost.upvote.length; i++){
      if (this.detailPost.upvote[i] === localStorage.getItem('id')){
          this.upvoteColor = true
      }
      if (this.detailPost.downvote[i] === localStorage.getItem('id')){
        this.downvoteColor = true
      }
    }
    for (let i=0; i<this.detailPost.downvote.length; i++){
      if (this.detailPost.downvote[i] === localStorage.getItem('id')){
        this.downvoteColor = true
      }
    }
  }
}
</script>

<style scoped>
  .heading{
    font-family: 'Anton', sans-serif;
  }
  .paragraph{
    font-family: 'Libre Franklin', sans-serif;
  }
  .upvoteColorClass{
    background-color: red !important
  }
  .downvoteColorClass{
    background-color: red !important
  }
</style>
