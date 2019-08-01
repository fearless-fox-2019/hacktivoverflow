<template>
  <v-container style="padding-right: 100px;">
    <div fluid style="padding-left : 25%; background-color: #FFB300; width: 68vw;">
      <h1
        style="font-family: 'Teko', sans-serif; font-size : 50px; padding-left: 23%;"
      >{{ cardTitle }}</h1>
    </div>
    <div v-for="data in answers" :key="data._id">
      <v-card width="850" style="margin-top: 30px; margin-left : 9.5%; height : auto;">
        <v-layout fill-height>
          <v-flex xs1 id="updown">
            <v-layout align-center justify-space-around column>
              <v-icon @click="upvotes(data._id, data)" style="cursor : pointer">mdi-arrow-up</v-icon>
              {{ data.UpVote.length - data.DownVote.length }}
              <v-icon @click="downvotes(data._id, data)" style="cursor : pointer">mdi-arrow-down</v-icon>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-card-title>
              <h3>{{ data.title }}</h3>
            </v-card-title>
            <v-card-text>
              <h5 style="font-size : 20px;">{{ data.content }}</h5>
            </v-card-text>
            <v-card-text
              style="margin-left: 20px; margin-top: 20px;"
            >Posted By : {{ data.UserId.name }}</v-card-text>
          </v-flex>
          <v-card-actions style="margin-top: 100px;" v-if="userId === data.UserId._id">
            <editModal :data="data" />            
          </v-card-actions>
        </v-layout>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import editModal from "../components/modalEditReply";
import { mapState } from "vuex";
export default {
  name: "",
  props: ["answer"],
  components : {
    editModal
  },
  data() {
    return {
      updownVotes: 0,
      upClicked: false,
      downClicked: false,
      userId : localStorage.id
    };
  },
  methods: {
    getId(id) {
      this.$store.dispatch("getOnePost", id);
      // this.$router.push('/detail')
    },
    deletePost(id) {
      console.log("asdasdasdas");
      ax({
        method: "delete",
        url: `/posts/${id}`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          this.$store.dispatch("getAllQuestions");
          this.$store.dispatch("getMyPosts");
          console.log("sukses delete");
          this.$store.commit("SET_SNACKBAR", {
            appearance: true,
            snackbarStatus: "success",
            alertMessage: "Successfully Delete Post"
          });
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    upvotes(id, objData) {
      if (this.isLogin) {
        console.log(objData, "ini post data");
        let dataFilter = objData.UpVote.filter(el => el == localStorage.id);
        if (dataFilter.length > 0) {
          let idx = objData.UpVote.findIndex(el => el == localStorage.id);
          objData.UpVote.splice(idx, 1);
          this.$store.dispatch("upvoteAnswer", id);
        } else {
          objData.UpVote.push(localStorage.id);
          let idxDown = objData.DownVote.findIndex(el => el == localStorage.id);
          if (idxDown !== -1) {
            objData.DownVote.splice(idxDown, 1);
          }
          this.$store.dispatch("upvoteAnswer", id);
        }
      }
    },
    downvotes(id, objData) {
      if (this.isLogin) {
        console.log(objData, "ini post data");
        let dataFilter = objData.DownVote.filter(el => el == localStorage.id);
        if (dataFilter.length > 0) {
          let idx = objData.DownVote.findIndex(el => el == localStorage.id);
          objData.DownVote.splice(idx, 1);
          this.$store.dispatch("downvoteAnswer", id);
        } else {
          objData.DownVote.push(localStorage.id);
          let idxUp = objData.UpVote.findIndex(el => el == localStorage.id);
          if (idxUp !== -1) {
            objData.UpVote.splice(idxUp, 1);
          }
          this.$store.dispatch("downvoteAnswer", id);
        }
      }
    }
  },
  created() {
    this.$store.dispatch("getAllAnswers", this.$route.params.id);    
  },
  computed: {
    ...mapState(["cardTitle", "currUserId", "isLogin", "answers"])
  }
};
</script>

<style>
</style>
