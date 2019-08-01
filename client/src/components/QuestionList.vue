<template>
  <div>
    <div v-if="search" class="d-flex justify-content-between" style="padding: 10px; padding-bottom: 0">
      <div style="font-size: 14px">
        # <i>{{searchValue}}</i>: {{questions.length}} question(s) found
      </div>
      <div style="font-size: 14px">
        <a href="#" @click="back">Back</a>
      </div>
    </div>
    <hr v-if="search" style="margin: 5px">
    <ul class="list-group mt-4">
      <li class="list-group-item" v-for="question in questions" :key="question._id">
        <div class="response d-flex align-items-center">
          <div class="response__answer">
            <div>{{question.AnswerId.length}}</div>
            <div class="desc">Answer</div>
          </div>
          <div class="response__answer">
            <div>{{question.upvote ? question.upvote.length : 0}}</div>
            <span class="desc">Upvote</span>
          </div>
          <div class="response__answer">
            <div>{{question.downvote ? question.downvote.length : 0}}</div>
            <span class="desc">Downvote</span>
          </div>
        </div>
        <div class="title">
          <div class="content">
            <router-link :to="`/question/${question._id}`" style="text-decoration: none">
              <div class="header">{{question.title}}</div>
              <hr style="margin: 0; margin-bottom: 10px">
              <div v-if="question.description.length > 200" class="desc">{{question.description.slice(0, 200)}}...</div>
              <div v-else class="desc">{{question.description}}</div>
            </router-link>
            <div class="manipulate" v-if="manipulate">
              <div class="edit" @click="editQuestion(question._id)">Edit</div>
               <div>
                 <a href="#" class="icon" style="text-decoration: none" @click="deleteQuestion(question._id)"><i class="fas fa-trash" style="padding-top: 10px"></i></a>
               </div>
              <!-- <div class="delete" @click="deleteQuestion(question._id)">Delete</div> -->
            </div>
          </div>
          <div class="tags-container d-flex justify-content-end flex-column">
            <ul class="tags">
              <li v-for="(tag, index) in question.tags" :key="index" @click="searchByTag(tag)"># {{tag.toLowerCase()}}</li>
            </ul>
            <div class="author d-flex justify-content-end">by {{question.UserId.username}}</div>
            <div class="author d-flex justify-content-end"><div style="padding-right: 5px">asked: </div><i>{{question.createdAt | moment("MMMM Do YY")}}</i></div>
          </div>
        </div>
      </li>
    </ul>
    <!-- {{questionByTag}} -->
  </div>
</template>

<script>
export default {
  props: ["questions", "manipulate"],
  methods: {
    data() {
      return {
        search: false,
        searchValue: ''
      }
    },
    back() {
      this.search = false
      this.$store.dispatch('getQuestion')
    },
    editQuestion(id) {
      this.$router.push(`/question/edit/${id}`);
    },
    deleteQuestion(id) {
      this.$alertify.confirmWithTitle(
        "Omniscience",
        "Are you sure?",
        () => {
          this.$store.dispatch("deleteQuestion", id).then(() => {
            if (!this.$store.getters.error) {
              this.$alertify.success("Question deleted");
            }
          });
        },
        () => {
          // this.$alertify.error(
          //   "Failed, please check your internet connection or try again"
          // );
        }
      ).set({transition:'slide'});
    },
    searchByTag(tagName) {
      this.search = true
      this.searchValue = tagName
      this.questions = this.questions.filter(el => el.tags.some(el => el == tagName.toLowerCase()))
    }
  }
};
</script>

<style>
.response {
  display: flex;
  width: 173px;
  justify-content: space-between;
}
.title {
  text-align: left;
  width: 29em;
  margin-left: 29px;
}
.header {
  font-size: 1.1em;
  font-weight: 600;
  color: #616161;
}
.header:hover {
  font-size: 1.1em;
  font-weight: 600;
  color: black
}
.desc {
  font-size: 14px;
  text-decoration: none;
  color: #888888;
  text-align: justify
}
.list-group li {
  display: flex;
  justify-content: space-between;
}
.response__answer {
  color: #616161;

  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 43px;
}
.response__answer > .desc {
  font-size: 12px;
}
.tags-container {
  display: flex;
  justify-content: space-between;
  width: 29em;
}
.tags {
  padding: 0px;
  text-align: left;
}
.tags li {
  background-color: #616161;
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px;
  padding: 2px 12px;
  margin-right: 8px;
  font-size: 13px;
  padding: 2px 8px;
}
.tags li:hover {
  background-color: #4b4b4b;
  cursor: pointer;
}
.tags li:not(:first-child) {
  margin-left: 7px;
}
.author {
  font-size: 13px;
  color: #616161;
}
.content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.7em;
}
.manipulate {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 7.5em;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 15px;
  flex-direction: column;
  text-align: right;
  height: 1em;
}
.manipulate .edit {
  color: #8f97ff;
}
.manipulate .edit:hover {
  color: #5c64c0;
  cursor: pointer;
}
.manipulate .delete {
  color: #f85d5d;
}
.manipulate .delete:hover {
  color: #ed1616;
  cursor: pointer;
}
.mt-4 {
  margin-top: 0px !important;
}
.icon {
  color: #7F7E7F;
  text-decoration: none
}
.icon:hover {
  color: #4b4b4b;
}
</style>
