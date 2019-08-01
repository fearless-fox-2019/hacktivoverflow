<template>
  <div class="answer-card d-flex">
    <div class="votes col-1">
      <a href>
        <img class="upvote" src="@/assets/up.svg" alt="upvote" />
      </a>
      <div class="votes">{{totalVotes}}</div>
      <a href>
        <img class="downvotes" src="@/assets/down.svg" alt="downvote" />
      </a>
    </div>

    <div class="user d-flex flex-column col-2">
      <div class="prof-pic">
        <img src="@/assets/portrait.jpg" alt />
      </div>
      <div class="user-info">
        <small>{{user.username}}</small>
      </div>
    </div>

    <div class="content d-flex flex-column col-9">
      <p class="paragraph">{{content}}</p>
      <div class="options align-self-end">
        <a href @click.prevent="deleteAnswer({questionId: question._id, answerId: id})">Delete</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: [
    "id",
    "content",
    "createdAt",
    "user",
    "question",
    "upVotes",
    "downVotes"
  ],
  methods: {
    ...mapActions(["deleteAnswer"])
  },
  computed: {
    totalVotes() {
      return this.upVotes - this.downVotes;
    }
  }
};
</script>

<style scoped>
.prof-pic img {
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.paragraph {
  text-align: left;
}

div.answer-card {
  border-bottom: 1px solid rgb(190, 190, 190);
  margin-bottom: 30px;
  padding-bottom: 20px;
}
</style>
