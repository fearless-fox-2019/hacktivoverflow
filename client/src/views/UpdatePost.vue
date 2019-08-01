<template>
  <div class="row mt-4">
    <div class="col-sm-2">
      
    </div>
    
    <div class="col-sm-8 ">
      <b-form-group>
        <b-form-input
          type="text"
          v-model="details.title"
          required
          placeholder="Title"
        ></b-form-input>
      </b-form-group>
      <tinymce-editor v-model="details.content" api-key="1d9hzq7843jfpu3bcfhtzccsin7i1j0iz4k6vxg9pl1ridhc" :init="{plugins: 'wordcount'}"></tinymce-editor>
      <b-button @click="submit" variant="primary" class="d-flex justify-content-start mt-3">Submit</b-button>
    </div>

    <div class="col-sm-2">
      
    </div>
    
    
  </div>
</template>

<script>
// const baseUrl = `http://localhost:3000`
const baseUrl = `http://35.240.247.85/`
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    'tinymce-editor': Editor // <- Important part
  },
  data(){
    return{
      details: {
        title: "",
        content: ''
      }
    }
  },
  methods: {
    submit(){
      console.log('ini submit', this.details)
      axios({
        url: `${baseUrl}/api/posts/${this.$store.state.updatePost}`,
        method: "patch",
        dataType: "json",
        data: this.details,
        headers: {
          token: localStorage.getItem('token')
        }
        })
        .then(({data})=>{
          this.details = {
            title: data.title,
            content: data.content
          }
          Swal.fire('Answer has been editted')
          this.$router.push('/myPost')
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  },
  created(){
    axios({
      url: `${baseUrl}/api/posts/${this.$store.state.updatePost}`,
      method: "get",
      dataType: "json",
      headers: {
        token: localStorage.getItem('token')
      }
      })
      .then(({data})=>{
        this.details = {
          title: data.title,
          content: data.content
        }
        console.log(data)
        // this.$router.push('/')
        // Swal.fire('Post has been replied')
      })
      .catch((err)=>{
        console.log(err)
      })
  },
}
</script>

<style>

</style>
