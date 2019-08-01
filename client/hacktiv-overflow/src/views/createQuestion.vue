<template>
  <v-app id="create">
    <snackbar />
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center row wrap>
          <v-flex xs3>
            <sidenav />
          </v-flex>
          <v-flex xs9>
            <v-card max-width="1000" class="mx-auto">
              <v-card-title>
                <h1 style="text-align : center">Ask a Question</h1>
              </v-card-title>

              <v-divider></v-divider>

              <v-content>
                <v-container fluid fill-height>
                  <v-layout justify-center column>
                    <v-flex xs9>
                      <h3>Title</h3>
                      <v-text-field
                        v-model="inputTitle"
                        label="Write Your Question title here.."
                        single-line
                        outlined
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-textarea
                        outlined
                        name="input-7-4"
                        v-model="inputDescription"
                        label="Spesific Description"
                      ></v-textarea>
                    </v-flex>
                    <v-flex xs12>
                      <v-btn
                        large
                        color="yellow darken-1"
                        style="margin-left: 77%;"
                        @click="createQuest"
                      >SUBMIT YOUR QUESTION</v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-content>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import snackbar from "../components/snackbar";
import sidenav from "../components/sidenav";
import ax from "../api/api";
import alert from "../components/alert";
import { mapMutations, mapState } from "vuex";
export default {
  name: "create",
  components: {
    sidenav,
    snackbar,
    alert
  },
  data() {
    return {
      inputTitle: "",
      inputDescription: ""
    };
  },
  methods: {
    createQuest() {
      if (this.isLogin === false) {
        this.$store.commit("SET_SNACKBAR", {
          appearance: true,
          snackbarStatus: "red darken-1",
          alertMessage: "you have to login first!"
        });
      } else {
        let newQuest = {
          title: this.inputTitle,
          content: this.inputDescription
        };
        ax({
          method: "post",
          url: `/posts`,
          data: newQuest,
          headers: { token: localStorage.token }
        })
          .then(({ data }) => {
            console.log("sukses create");
            this.inputTitle = "";
            this.inputDescription = "";
            this.$router.push("/");
            this.$store.commit("SET_SNACKBAR", {
              appearance: true,
              snackbarStatus: "success",
              alertMessage: "Successfully add new Question"
            });
          })
          .catch(({ response }) => {
            console.log(response);
            if (response.data.message.includes('can\'t be blank')) {
              this.$store.commit("SET_SNACKBAR", {
                appearance: true,
                snackbarStatus: "red darken-1",
                alertMessage: "You have to fill all field to post your question!"
              });
            }            
          });
      }
    }
  },
  created(){
    this.$store.commit('SET_LOGIN')
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>

<style>
</style>
