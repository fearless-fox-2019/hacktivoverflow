<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" presistent max-width="1000">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
      </template>
      <v-container fluid fill-height class="grey lighten-4" height="auto" style="overflow: hidden;">
        <v-layout justify-center row wrap>
          <v-content>
            <h1 style="text-align: center">Update Your Question</h1>
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
                    @click="updateData(data._id)"
                  >SUBMIT YOUR CHANGE</v-btn>
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
import { mapState } from "vuex";
export default {
  name: "edit",
  props: ["data"],
  components: {},
  data() {
    return {
      dialog: false,
      inputTitle: this.data.title,
      inputDescription: this.data.content
    };
  },
  methods: {
    updateData(id) {
      if (!this.inputTitle || !this.inputDescription) {
        this.$store.commit("SET_SNACKBAR", {
          appearance: true,
          snackbarStatus: "error",
          alertMessage: "You have to fill all of edit post field!"
        });
      }
      else {
        let newData = {
          title: this.inputTitle,
          content: this.inputDescription
        };
        ax({
          method: "patch",
          url: `/posts/${id}`,
          headers: { token: localStorage.token },
          data: newData
        })
          .then(({ data }) => {
            console.log("sukses update");
            this.dialog = false;
            this.$store.dispatch("getAllQuestions");
            this.$store.dispatch("getMyPosts");
            this.$store.commit("SET_SNACKBAR", {
              appearance: true,
              snackbarStatus: "success",
              alertMessage: "Successfully Edit Question"
            });
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }
    }
  },
  computed: {}
};
</script>

<style>
</style>
