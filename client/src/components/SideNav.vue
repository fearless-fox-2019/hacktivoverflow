<template>
   <b-col cols="2">
      <b-card
        :title="username"
        img-src="../assets/images/image_avatar.png"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
        
      >
        <b-card-text>
          Welcome to a place where you can ask and answer questions about anything!
        </b-card-text>
      </b-card>
      <b-card header="Posts">
          <b-list-group>
            <b-list-group-item v-b-modal.addQuestion>Add Question</b-list-group-item>
            <b-list-group-item href="#">
              Your Posts
              </b-list-group-item>
            <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
          </b-list-group>

          <p class="card-text mt-2">
            Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
            consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
            mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
          </p>
        </b-card>
    </b-col>
  
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username')
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
