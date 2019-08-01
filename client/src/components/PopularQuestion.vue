<template>
  <div id="popular-post" @click="toDetail">
    <div id="popular-container">
      <p id="title">{{post.title}}</p>
      <div id="upvote">
        <b-icon
          pack="fas"
          icon="arrow-up"
          class="arrow"
          >
        </b-icon>
        <p>{{post.score}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popularPost',
  props: ['post'],
  methods: {
    toDetail () {
      window.open(this.post.link, '_blank')
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#popular-post {
  border: 2px solid #311B92;
  border-radius: 15px;
  padding: 0.5em;
  margin: 1em;
  background-color: white;
}

#title {
  color: #311B92;
  font-weight: bold;
  font-size: 14px;
}

#popular-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#popular-post:hover{
  cursor: pointer;
  background-color: rgba(49, 27, 146, 0.082);
}

#upvote {
  display: flex;
  /* justify-content: space-evenly; */
}

.arrow {
  margin-right: 5px;
  color: #311B92;
}
</style>
