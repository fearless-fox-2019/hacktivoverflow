<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="1000px">
      <template v-slot:activator="{ on }">
        <v-btn color="yellow darken-1" v-on="on">Answer</v-btn>
      </template>
      <v-container fluid fill-height class="grey lighten-4" height="auto" style="overflow: hidden;">
        <v-layout justify-center row wrap>
          <v-content>
            <h1 style="text-align: center">Write Your Answer</h1>
            <v-container fluid fill-height>
              <v-layout justify-center column>
                <v-flex xs9>
                  <h3>Title</h3>
                  <v-text-field
                    v-model="inputAnswerTitle"
                    label="Write Your Answer title here.."
                    single-line
                    outlined
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    outlined
                    name="input-7-4"
                    v-model="inputAnswerDescription"
                    label="Spesific Description"
                    height="150"
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 row justify-end>               
                    <v-btn
                      large
                      color="yellow darken-1"
                      style="margin-right : 10px;"                      
                      @click="dialog = false"
                    >Close</v-btn>                 
                    <v-btn
                      large
                      color="yellow darken-1"                      
                      @click="createAnswer"
                    >SUBMIT YOUR ANSWER</v-btn>                
                </v-flex>
              </v-layout>
            </v-container>
          </v-content>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
import ax from "../api/api";
export default {
  name: "reply",
  components: {},
  data() {
    return {
      dialog: false,
      inputAnswerTitle: "",
      inputAnswerDescription: ""
    };
  },
  methods: {
    createAnswer() {
      let newData = {
        title: this.inputAnswerTitle,
        content: this.inputAnswerDescription,
        postId: this.$route.params.id
      };
      ax({
        method: "post",
        url: `/answers`,
        headers: { token: localStorage.token },
        data: newData
      })
        .then(({ data }) => {
          console.log("sukses create answer");
          this.inputAnswerTitle = "";
          this.inputAnswerDescription = "";
          this.dialog = false;
          this.$store.dispatch("getAllAnswers", this.$route.params.id);
          this.$router.push(`/detail/${this.$route.params.id}`)
          this.$store.commit("SET_SNACKBAR", {
            appearance: true,
            snackbarStatus: "success",
            alertMessage: "Successfully Create Reply"
          });
        })
        .catch(({ response }) => {
          console.log(response);
          if (response.data.message.includes("can't be blank")) {
            this.$store.commit("SET_SNACKBAR", {
              appearance: true,
              snackbarStatus: "error",
              alertMessage: "You have to fill all field to post your answer!"
            });
          }
        });
    }
  }
};
</script>

<style>
</style>
