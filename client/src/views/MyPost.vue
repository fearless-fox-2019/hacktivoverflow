<template>
  <div class="home row mt-4">
    <div class="col-sm-2">
      
    </div>

    <div class="col-sm-8">
      <Post v-for="post in this.$store.state.userPosts" :key="post._id" :detailPost="post" :refresh="refresh"></Post>
    </div>

    <div class="col-sm-2">
      
    </div>

  </div>
</template>

<script>
// const baseUrl = `http://localhost:3000`
const baseUrl = `http://35.240.247.85`
import Post from '../components/Post'

export default {
  components: {
    Post
  },
  methods: {
    refresh(data){
      this.$store.commit('myPost', true)
      // this.$store.state.userPosts = data
      console.log('masuk data', data)
      console.log('====',this.$store.state.myPost)

      axios({
        url: `${baseUrl}/api/posts/findUser`,
        method: "get",
        dataType: "json",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.$store.commit('userPosts', data)
        console.log(this.$store.state.userPosts)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },
  created(){

    if (!localStorage.getItem('token')){
      Swal.fire('Please Login First')
      this.$router.push(`/`)
    }
    else {
      this.$store.commit('myPost', true)
      console.log('====',this.$store.state.myPost)
  
      axios({
        url: `${baseUrl}/api/posts/findUser`,
        method: "get",
        dataType: "json",
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        this.$store.commit('userPosts', data)
        console.log(this.$store.state.userPosts)
      })
      .catch((err)=>{
        console.log('masuk error')
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
