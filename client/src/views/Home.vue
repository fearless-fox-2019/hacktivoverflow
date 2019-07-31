<template>
  <div class="home">
    <!-- Card -->
      <b-row>
        <b-col cols="2">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
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
                <b-list-group-item href="#">Add Post</b-list-group-item>
                <b-list-group-item href="#">Your Posts</b-list-group-item>
                <b-list-group-item href="#">Vestibulum at eros</b-list-group-item>
              </b-list-group>

              <p class="card-text mt-2">
                Quis magna Lorem anim amet ipsum do mollit sit cillum voluptate ex nulla tempor. Laborum
                consequat non elit enim exercitation cillum aliqua consequat id aliqua. Esse ex consectetur
                mollit voluptate est in duis laboris ad sit ipsum anim Lorem.
              </p>
            </b-card>
        </b-col>
        <b-col cols="7">
          <!-- Card -->
           <QuestionList></QuestionList>
<!-- Card -->
        </b-col>
        <b-col cols="3">
          <h2 class="text-center">Post of the day</h2>
          <div class="card">
            <div class="card-body">
              <h4 class="card-title"> Card Title</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. </p>
            </div>
          </div>
        </b-col>
      </b-row>
<!-- Card -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import QuestionList from '../components/QuestionLists'

export default {
  name: 'home',
  components: {
    HelloWorld,
    QuestionList
  }
}
</script>

<style scoped>
.home {
  background-color: #E8E8E8;
  min-height: 100%;
  background-repeat: no-repeat;
  background-size: auto;
}


</style>

