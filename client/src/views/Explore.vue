<template>
  <div>
    <div v-if="onClickTag" class="columns">
      <div class="column que container is-fullhd is-fullheight">
        <div class="columns is-gapless" v-for="data in resultClickTag" :key="data._id">
          <!-- {{dataQuestions}} -->
          <qCard :data="data" class="column" style="margin:10px;border-radius:0"></qCard>
        </div>
      </div>
    </div>
    <div v-if="!onClickTag" class="columns">
      <div class="column que container is-fullhd is-fullheight">
        <div class="columns is-gapless" v-for="data in filteredQuest" :key="data._id">
          <!-- {{dataQuestions}} -->
          <qCard :data="data" class="column" style="margin:10px;border-radius:0"></qCard>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="column myTag">
          <div style="background-color:black; border-radius:20px">
            <h3>WATCHED TAG(s)</h3>
          </div>
          <!-- button edit -->
          <b-button
            v-if="!onEdit"
            @click="changeEdit(true)"
            size="is-small"
            style="margin:2px; float:left"
            class="is-success"
            rounded
          >
            <i class="fas fa-edit"></i>
          </b-button>
          <!-- button save -->
          <b-button
            v-if="onEdit"
            @click="saveWatchedTags"
            size="is-small"
            style="margin:2px; float:left"
            class="is-success"
            rounded
          >
            <i class="fas fa-check"></i>
          </b-button>
          <!-- button close -->
          <b-button
            v-if="onEdit"
            @click="changeEdit(false)"
            size="is-small"
            style="margin:2px; float:left"
            class="is-danger"
            rounded
          >
            <i class="fas fa-times" style="font-size:13px; width:12px"></i>
          </b-button>
          <br />
          <br />
          <!-- if watched tags availale -->
          <div v-if="$store.state.currentUser.tags.length > 0 && !onEdit">
            <div
              @click="clickTagOnCard(tag)"
              v-for="(tag, i) in $store.state.currentUser.tags"
              :key="i"
              style="display:inline"
            >
              <b-tag type="is-light" style="margin:2px;cursor: pointer;">{{tag}}</b-tag>
            </div>
          </div>
          <!-- input tags while edit -->
          <div v-if="onEdit">
            <b-taginput
              v-model="tags"
              :data="dataTags"
              autocomplete
              :allow-new="allow"
              icon="label"
              placeholder="Add a tag"
              @typing="getFilteredTags"
            ></b-taginput>
          </div>
          <!-- if watched tags unavailale -->
          <div v-if="$store.state.currentUser.tags.length === 0 && !onEdit">
            <small style="color:white">
              <b>empty tags</b>
            </small>
          </div>
        </div>

        <div class="column popularTag">
          <div style="background-color:black; border-radius:20px">
            <h3>LIST OF TAG(s)</h3>
          </div>
          <br />
          <div
            @click="clickTagOnCard(tag)"
            v-for="(tag, i) in allTags"
            :key="i"
            style="display:inline"
          >
            <b-tag class="popular-tag" type="is-warning" style="margin:2px;cursor: pointer;">{{tag}}</b-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import questionCard from "../components/questionCard";

export default {
  name: "explore",
  components: {
    qCard: questionCard
  },
  computed: {
    ...mapState([
      "isLogin",
      "dataQuestions",
      "currentUser",
      "allTags",
      "onClickTag",
      "resultClickTag"
    ]),
    filteredQuest() {
      let result = [];
      this.tags.forEach(myTag => {
        this.dataQuestions.forEach(question => {
          if (question.tags.includes(myTag)) {
            result.push(question);
          }
        });
      });

      return [...new Set(result)];
    }
  },
  data() {
    return {
      onEdit: false,
      dataTags: this.$store.state.allTags,
      allow: true,
      tags: this.$store.state.currentUser.tags
    };
  },
  methods: {
    clickTagOnCard(tag) {
      this.$store.dispatch("getClickedTag", tag);
      this.$store.commit("clickTag", true);
      this.$router.push("/explore");
    },
    getFilteredTags(text) {
      this.dataTags = this.$store.state.allTags.filter(option => {
        return option.toLowerCase().includes(text.toLowerCase());
      });
    },
    changeEdit(status) {
      this.$store
        .dispatch("findCurrentUser")
        .then(() => {})
        .catch(err => {});
      this.tags = this.currentUser.tags;
      console.log("this.tags: ", this.tags);
      console.log("this.currentUser.tags;: ", this.currentUser.tags);
      this.onEdit = status;
    },
    saveWatchedTags() {
      this.$store
        .dispatch("editWatchedTag", this.tags)
        .then(() => {
          this.changeEdit(false);
        })
        .catch(() => {
          this.$toast.open("fail to save watched tags");
        });
    }
  }
};
</script>

<style scoped>
.columns {
  margin-top: 0;
  padding: 0;
  /* max-height: 100vh; */
}
.column {
  overflow: scroll;
  /* background-color: rgba(0, 0, 0, 0.5); */
  max-height: 91vh;
}
.column.is-one-third {
  padding: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
}
.myTag {
  height: 50%;
  border-bottom: dotted 2px rgb(44, 36, 20);
  font-family: "Alegreya Sans", sans-serif;
}

.popularTag {
  height: 50%;
  font-family: "Alegreya Sans", sans-serif;
}
.popular-tag {
  cursor: pointer;
}
.myTag h3 {
  color: rgb(238, 153, 16);
  font-weight: bold;
}
h3 {
  color: rgb(238, 153, 16);
  font-weight: bold;
}
</style>

