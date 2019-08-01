<template>
  <div class="answer columns">
    <div class="column is-2 left">
      <div class="upvote" @click="upvote(answer._id)"><i class="fas fa-chevron-up"></i></div>
      <div class="totalvote">{{totalVote}}</div>
      <div class="downvote" @click="downvote(answer._id)"><i class="fas fa-chevron-down"></i></div>
    </div>
    <div class="column right">
      <div class="rightop">
        <h2>{{answer.answer}}</h2>
      </div>
      <div class="rightbot ">
        <p class="time">{{when}}</p>
        <p class="creator">{{answer.userId.username}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["answer"],
  methods: {
    upvote(id){
      console.log('upveote answer',id)
      this.$store.dispatch('answerVote',{
        vote: 'up',
        answerId: id
      })
    },
    downvote(id){
      console.log('downvote asnwer',id)
      this.$store.dispatch('answerVote',{
        vote: 'down',
        answerId: id
      })
    }
  },
  computed: {
    totalVote() {
      return this.answer.upVote.length - this.answer.downVote.length;
    },
    when() {
    //   console.log(this.answer, "===");
      return moment(this.answer.createdAt)
        .startOf("day")
        .fromNow();
    }
  }
};
</script>

<style scoped>
.answer {
  min-height: 70px;
  border: 1px solid cornflowerblue;
  margin: 15px 0px 15px 35px;
}
/* .column {
  border: 1px solid sienna;
} */
.rightop {
  text-align: left;
}
.rightbot{
    text-align: right;
    /* border: 1px solid blueviolet;
    border-radius: 4px; */
}
.left{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.time{
    font-size: 12px;
}
</style>
