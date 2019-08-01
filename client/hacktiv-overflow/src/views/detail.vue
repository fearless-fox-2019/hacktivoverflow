<template>
  <v-app id="keep">
    <snackbar />
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center row wrap>
          <v-flex xs3>
            <sidenav style="position : fixed; margin-top: 60px;" />
          </v-flex>
          <v-flex xs9>
            <v-card width="1000" style="height : auto">
              <v-layout align-center column>
                <h1 style="text-align : center">Detail</h1>
                <v-divider></v-divider>
                <v-container fluid>
                  <v-layout align-center justify-space-around row>
                    <v-flex xs1 id="updown">
                      <v-layout align-center justify-space-around column>
                        <v-icon
                          @click="upvotes(post._id)"
                          style="cursor : pointer"
                        >mdi-arrow-up</v-icon>
                        {{ post.UpVote.length  - post.DownVote.length }}
                        <v-icon
                          @click="downvotes(post._id)"
                          style="cursor : pointer"
                        >mdi-arrow-down</v-icon>
                      </v-layout>
                    </v-flex>
                    <v-flex x11>
                      <v-flex>
                        <h2 style="margin-left : 20px">{{ post.title }}</h2>
                      </v-flex>
                      <v-flex>
                        <v-card-text style="color: black; font-size : 18px;">{{ post.content }}</v-card-text>
                      </v-flex>
                    </v-flex>
                    <modalAnswer />
                  </v-layout>
                </v-container>
              </v-layout>
            </v-card>
            <v-layout align-center justify-space-around column>
              <div style="width: 90%; margin-right: 11.5%; margin-top : 50px;">
                <answer :answer="answers" />
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import modalAnswer from "../components/modalReply";
import snackbar from "../components/snackbar";
import sidenav from "../components/sidenav";
import answer from "../components/answer-card";
import { mapState } from "vuex";
import ax from "../api/api";
export default {
  name: "detail",
  components: {
    snackbar,
    sidenav,
    answer,
    modalAnswer
  },
  data() {
    return {
      post: {},
      updownVotes: 0,
      upClicked: false,
      downClicked: false
    };
  },
  methods: {
    getOnePost() {
      ax({
        method: "get",
        url: `/posts/findOne/${this.$route.params.id}`
      })
        .then(({ data }) => {
          console.log(data, 'ini data one post dari detail ya');
          this.post = data;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    },
    upvotes(id) {
      console.log('ketriggered')
      let objData = this.post
      if (this.isLogin) {
        console.log(objData, "ini post data");
        let dataFilter = objData.UpVote.filter(el => el == localStorage.id);
        if (dataFilter.length > 0) {
          let idx = objData.UpVote.findIndex(el => el == localStorage.id);
          objData.UpVote.splice(idx, 1);
          this.$store.dispatch("upvote", id);
        } else {
          objData.UpVote.push(localStorage.id);
          let idxDown = objData.DownVote.findIndex(el => el == localStorage.id);
          if (idxDown !== -1) {
            objData.DownVote.splice(idxDown, 1);
          }
          this.$store.dispatch("upvote", id);
        }
      }
    },
    downvotes(id) { 
      let objData = this.post     
      if (this.isLogin) {
        console.log(objData, "ini post data");
        let dataFilter = objData.DownVote.filter(el => el == localStorage.id);
        if (dataFilter.length > 0) {
          let idx = objData.DownVote.findIndex(el => el == localStorage.id);
          objData.DownVote.splice(idx, 1);
          this.$store.dispatch("downvote", id);
        } else {
          objData.DownVote.push(localStorage.id);
          let idxUp = objData.UpVote.findIndex(el => el == localStorage.id);
          if (idxUp !== -1) {
            objData.UpVote.splice(idxUp, 1);
          }
          this.$store.dispatch("downvote", id);
        }
      }
    }
  },
  computed: {
    ...mapState(["answers", 'isLogin'])
  },
  created() {
    this.getOnePost();
    this.$store.commit('SET_LOGIN')
    this.$store.commit("SET_CARD_TITLE", "Answers");
    this.$store.dispatch("getAllAnswers", this.$route.params.id);
  }
};
</script>

<style>
#postDetail {
  width: 600px;
  height: 600px;
  border: 2px solid grey;
  margin-left: 20%;
}
#cardDetail {
  width: 100vh;
  height: 100vh;
  border: 2px solid grey;
}
</style>
