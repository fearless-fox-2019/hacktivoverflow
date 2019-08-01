<template>
<v-container>
  <v-card class="mx-auto">
    <v-toolbar color="green" dark>
      <v-toolbar-title>All Question</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn @click.prevent="addQuestion" v-if="$store.state.isLogin" color="grey" dark>
        <v-icon left>fas fa-plus</v-icon>ASK QUESTION
      </v-btn>
    </v-toolbar>

    <v-list three-line>
      <v-list-item-group multiple>
        <template v-for="(item, index) in questions">
          <v-list-item :key="item.title" @click.prevent="detail(item._id)">
            <template v-slot:default="{ active, toggle }">
              <v-layout row>
                <v-flex md3>
                  <v-layout row align-content-center justify-center>
                    <v-flex>
                      <v-layout column align-center>
                        <v-flex>{{ item.answers.length }}</v-flex>
                        <v-flex> <span style="padding-left:10px">Answers</span></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex>
                      <v-layout column align-center>
                        <v-flex>{{ item.upvotes.length }}</v-flex>
                        <v-flex>Up Votes</v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex>
                      <v-layout column align-center>
                        <v-flex>{{ item.downvotes.length }}</v-flex>
                        <v-flex>Down Votes</v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex md9>
                  <v-list-item-title two-line class="title" v-text="item.title" dense style="padding-left:20px"></v-list-item-title>
                  <v-flex xs12 sm5 md5 offset-xs0 offset-lg10 class="caption">
                    <span>{{ item.createdAt | moment("from", "now") }}</span>
                    <span> by {{item.userId.username}}</span>
                  </v-flex>
                </v-flex>
              </v-layout>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider v-if="index + 1 < $store.state.questions.length" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</v-container>
</template>

<script>
export default {
  data: () => ({
    questions : []
  }),
  methods : {
    addQuestion() {
      this.$router.push('/questionform')
    },
    detail(id){
      this.$store.dispatch('getDetailQuestion', id)
      this.$router.push(`/questions/${id}`)
    }
  },
  mounted(){
    this.$store.watch(this.$store.getters.getQuestions, n => {
      this.questions = n;
    });
  }
};
</script>

<style>
</style>
