<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Question ?</v-toolbar-title>
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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="addQuestion" >Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    title: "",
    description: ""
  }),
  methods: {
    addQuestion() {
      console.log("masuk");
      this.$store.dispatch("addQuestion", {
        title: this.title,
        description: this.description
      });
    }
  }
};
</script>