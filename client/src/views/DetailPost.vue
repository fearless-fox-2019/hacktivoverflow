<template>
  <div>
    <div class="home row mt-4">
      <div class="col-sm-2">
        
      </div>

      <div class="col-sm-8">
        <b-card>
          <b-card>
            <h3 class="heading">Post Details</h3>
            <b-card :title="detail.title" class="heading">
              <b-card-text v-html="detail.content" class="paragraph"></b-card-text>
            </b-card>
          </b-card>

          <b-card>
            <h3 class="heading">Answer</h3>
            <b-card v-if="detail.answerId.length === 0">
              <p>No Reply for this post. Be the first</p>
            </b-card>

            <b-card :title="data.title" v-for="data in detail.answerId" :key="data._id" class="heading">
              <b-card-text v-html="data.content" class="paragraph">{{data.content}}</b-card-text>
              <b-btn v-if="data.userId === userId" @click="updateAnswer(data._id)" class="btn btn-warning m-2" type="submit">Update Answer</b-btn>
              <b-btn v-if="data.userId === userId" @click="deleteAnswer(data._id)" class="btn btn-danger m-2" type="submit">Delete Answer</b-btn>
            </b-card>
          </b-card>

          <b-card>
            <div v-if="!this.$store.state.isLogin">
            <h2>You need to login to participate in the forum</h2>
            </div>

            <div v-if="this.$store.state.isLogin">
            <h3 class="heading">Reply</h3>
            <b-form-group>
              <b-form-input
                type="text"
                v-model="input.title"
                required
                placeholder="Title"
              ></b-form-input>
            </b-form-group>
            <tinymce-editor v-model="input.content" api-key="1d9hzq7843jfpu3bcfhtzccsin7i1j0iz4k6vxg9pl1ridhc" :init="{plugins: 'wordcount'}"></tinymce-editor>
            <b-btn @click="submit(detail._id)" variant="primary" class="m-2" type="submit">Submit</b-btn>

            </div>
          </b-card>
        </b-card>
      </div>

      <div class="col-sm-2">
        
      </div>

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
    return {
      detail : [],
      input:{
        title: '',
        content: ''
      },
      userId: ''
    }
  },
  methods:{
    updateAnswer(id){
      this.$router.push(`/updateAnswer/${id}`)
      this.$store.state.updateAnswer = id
      console.log('ini masuk update id global', this.$store.state.updateAnswer)
    },
    submit(id){
      axios({
        url: `${baseUrl}/api/answers/create/${id}`,
        method: "post",
        dataType: "json",
        data: this.input,
        headers: {
          token: localStorage.getItem('token')
        }
        })
        .then(({data})=>{
          this.$router.push('/')
          Swal.fire('Post has been replied')
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    deleteAnswer(id){
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
              url: `${baseUrl}/api/answers/${id}`,
              method: "delete",
              dataType: "json",
              headers: {
                token: localStorage.getItem('token')
              }
            })
            .then(({data})=>{
              this.$router.push(`/`)
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
    this.userId = localStorage.getItem('id')
    console.log('ini user id', this.userId)
    axios({
      url: `${baseUrl}/api/posts/${this.$store.state.detailPost}`,
      method: "get",
      dataType: "json",
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data})=>{
      console.log(data)
      this.detail = data
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style>

</style>
