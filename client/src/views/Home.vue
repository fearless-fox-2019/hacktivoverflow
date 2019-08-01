<template>
  <div class="home row mt-4">
    <div class="col-sm-2">
      
    </div>

    <div class="col-sm-8">
      <Post v-for="post in this.$store.state.allPosts" :key="post._id" :detailPost="post"></Post>
    </div>

    <div class="col-sm-2">
      
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import FormRegister from '@/components/FormRegister.vue'
import Post from '@/components/Post.vue'
// const baseUrl = `http://localhost:3000`
const baseUrl = `http://35.240.247.85`

export default {
  name: 'home',
  data (){
    return {
      posts: []
    }
  },
  components: {
    HelloWorld,
    FormRegister, Post
  },
  created(){
    this.$store.commit('myPost', false)
    
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
    .catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>
  .home {
    background: whitesmoke;
    height: 100%;
  };
</style>

