<template>
  <div class="tagsearch">
    tag search ini
    <!-- {{$store.state.searchbytagresult}} -->
    <div class="resultcard" v-for="(result,i) in $store.state.searchbytagresult" :key="i">
      <!-- {{result}} -->
      <!-- {{$route.query.tag}} -->
      <div class="columns">
        <div class="column is-2 updown">
          <div class="up">
            <span>{{result.upVote.length}}</span>
            <span>upvote</span>
          </div>
          <div class="down">
            <span>{{result.downVote.length}}</span>
            <span>downvote</span>
          </div>
        </div>
        <div class="column">
          <div class="content">
            <p>{{result.title}}</p>
            <p>{{result.content}}</p>
            <div class="tags">
              <div
                class="tag"
                v-for="(tag,i) in result.tags"
                :key="i"
                @click="searchtag(tag)"
              >{{tag}}</div>
            </div>
          </div>
          <div class="creator">
            <p>{{result.userId.username}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  methods: {
      searchtag(tag){
        this.$router.push('/search/tag?tag='+tag)
      }
  },
  computed: {
    // when() {
    //     console.log(this.$store.state.searchbytagresult[0])
    //   return moment(this.$store.state.searchbytagresult.userId.createdAt)
    //     .startOf("day")
    //     .fromNow();
    // }
  },
  mounted() {
    this.$store.dispatch("searchbytag", this.$route.query.tag);
  }
};
</script>

<style scoped>
.resultcard {
  min-height: 80px;
  border: 1px solid rebeccapurple;
  margin: 10px 25px;
  padding: 10px 20px;
}
.updown {
  display: flex;
}
.up {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.down {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.content {
  text-align: left;
  padding: 5px 5px 5px 20px;
  margin-bottom: 2px;
}
.tags {
  display: flex;
  margin-top: 10px;
}
.creator {
  text-align: right;
}
</style>
