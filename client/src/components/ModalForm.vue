<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">Edit</v-btn>
      </template>
      <v-card>
        <v-toolbar color="green" dark flat>
          <v-toolbar-title>Edit Question</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field v-model="title"></v-text-field>
            <v-textarea
              id="textarea"
              label="Description"
              name="description"
              type="textarea"
              auto-grow
              autofocus
              v-model="description"
            ></v-textarea>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" @click.prevent="editQuestion">Submit</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: ["data"],
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      title: this.data.title,
      description: this.data.description
    }
  },
  methods : {
    editQuestion(){
      this.$store.dispatch('editQuestion',{
        questionId : this.$route.params.id,
        title : this.title,
        description : this.description
      })
      this.dialog = false
      Swal.fire({
        position: "top-end",
        type: "success",
        title: "Your Question has been updated",
        showConfirmButton: false,
        timer: 1500
      });

    }
  }
};
</script>