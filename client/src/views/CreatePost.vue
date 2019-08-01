<template>
  <div class="row mt-4">
    <div class="col-sm-2">
      
    </div>
    
    <div class="col-sm-8 ">
      <b-form-group>
        <b-form-input
          type="text"
          v-model="post.title"
          required
          placeholder="Title"
        ></b-form-input>
      </b-form-group>
      <tinymce-editor v-model="post.content" api-key="1d9hzq7843jfpu3bcfhtzccsin7i1j0iz4k6vxg9pl1ridhc" :init="{plugins: 'wordcount'}"></tinymce-editor>
      <b-button @click="submit" variant="primary" class="d-flex justify-content-start mt-3">Submit</b-button>
    </div>

    <div class="col-sm-2">
      
    </div>
    
    
  </div>
</template>

<script>
// const baseUrl = `http://localhost:3000`
const baseUrl = `http://35.240.247.85`
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    'tinymce-editor': Editor // <- Important part
  },
  data(){
    return {
      post: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submit(){
      console.log('clicked')
      if(!localStorage.getItem('token')){
        Swal.fire('Please login first')
      }

      axios({
          url: `${baseUrl}/api/posts/create`,
          method: "post",
          dataType: "json",
          data: this.post,
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({data})=>{
          console.log(data)
          this.$router.push(`/`)
          Swal.fire('Post created')
        })
        .catch((err)=>{
          console.log(err)
          Swal.fire(err.response.data.message)
        })
    }
  },
  created(){
    if (!localStorage.getItem('token')){
      Swal.fire('Please Login First')
      this.$router.push(`/`)
    }
  }
}
</script>

<style>

</style>
