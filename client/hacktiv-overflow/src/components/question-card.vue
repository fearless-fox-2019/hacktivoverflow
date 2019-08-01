<template>
  <v-container style="padding-right: 100px;">
    <div fluid style="padding-left : 25%; background-color: #FFB300; width: 68vw;">
      <h1
        style="font-family: 'Teko', sans-serif; font-size : 50px; padding-left: 23%;"
      >{{ cardTitle }}</h1>
    </div>
    <div v-for="data in postData" :key="data._id">
      <v-card width="850" height="150" style="margin-top: 30px; margin-left : 9.5%;">
        <v-layout fill-height>
          <v-flex xs1 id="updown">
            <v-layout align-center justify-space-around column>
              <v-icon @click="upvotes(data._id, data)" style="cursor : pointer">mdi-arrow-up</v-icon>
              {{ data.UpVote.length - data.DownVote.length }} 
              <v-icon  @click="downvotes(data._id, data)" style="cursor : pointer">mdi-arrow-down</v-icon>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-card-title>
              <router-link :to="`/detail/${data._id}`" style="text-decoration: none;">{{ data.title }}</router-link>
              <!-- {{ data.title }} -->
            </v-card-title>
            <v-card-text
              style="margin-left: 20px; margin-top: 20px;"
            >Posted By : {{ data.UserId.name }}</v-card-text>
            <!-- <v-btn style="margin-top: 10px; margin-left: 5px;" text lg @click="getId(data._id)">Detail</v-btn> -->
          </v-flex>
          <v-layout align-center justify-space-around></v-layout>
          <v-card-actions style="margin-top: 100px;" v-if="currUserId === data.UserId._id">
            <editModal :data="data" />
            <v-btn @click="deletePost(data._id)" text>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-layout>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import snackbar from "../components/snackbar";
import ax from "../api/api";
import editModal from "../components/modalEdit";
export default {
  name: "question",
  props: ["postData"],
  components: {
    snackbar,
    editModal
  },
  data() {
    return {
      upClicked: false,
      downClicked: false,
      userId: localStorage.id
    };
  },
  computed: {
    ...mapState(["allPosts", "currUserId", "cardTitle", "isLogin"])
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
          this.$store.dispatch('upvote', id)
        } else {
          objData.UpVote.push(localStorage.id);
          let idxDown = objData.DownVote.findIndex(el => el == localStorage.id);
          if (idxDown !== -1) {
            objData.DownVote.splice(idxDown,1)
          }
          this.$store.dispatch('upvote', id)
        }
      }
    },
    downvotes(id, objData){
      if (this.isLogin) {
        console.log(objData, "ini post data");
        let dataFilter = objData.DownVote.filter(el => el == localStorage.id);
        if (dataFilter.length > 0) {
          let idx = objData.DownVote.findIndex(el => el == localStorage.id);
          objData.DownVote.splice(idx, 1);
          this.$store.dispatch('downvote', id)
        } else {
          objData.DownVote.push(localStorage.id);
          let idxUp = objData.UpVote.findIndex(el => el == localStorage.id);
          if (idxUp !== -1) {
            objData.UpVote.splice(idxUp,1)
          }
          this.$store.dispatch('downvote', id)
        }
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Teko&display=swap");
#updown {
  padding-top: 22px;
  border-right: 1px solid gray;
  /* border-h   */
}
</style>
