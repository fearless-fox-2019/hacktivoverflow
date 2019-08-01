<template>
  <div class="columns">
    <div class="column que container is-fullhd is-fullheight">
      <div class="columns is-gapless" v-for="data in dataQuestions" :key="data._id">
        <!-- {{dataQuestions}} -->
        <qCard :data="data" class="column" style="margin-left:10px"></qCard>
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
        <div v-if="tags.length > 0 && !onEdit">
          <b-tag v-for="(tag, i) in tags" :key="i" type="is-info">{{tag}}</b-tag>
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
        <div v-if="tags.length === 0 && !onEdit">
          <small style="color:white">
            <b>empty tags</b>
          </small>
        </div>
      </div>

      <div class="column popularTag" style="height:50%">
        <div style="background-color:black; border-radius:20px">
          <h3>LIST OF TAG(s)</h3>
        </div>
        <br />
        <b-tag
          class="popular-tag"
          v-for="(tag, i) in allTags"
          :key="i"
          type="is-warning"
          style="margin:2px;"
        >{{tag}}</b-tag>
      </div>
    </div>
  </div>
</template>

<script>

import questionCard from "../components/questionCard";
import { mapState } from "vuex";

export default {
  name: 'explore',
  components: {
    qCard: questionCard
  },
  computed: {
    ...mapState(["isLogin", "dataQuestions", "currentUser", "allTags"])
  },
  data() {
    return {
      onEdit: false,
      dataTags: this.allTags,
      allow: true,
      tags: this.currentUser.tags
    };
  },
  methods: {
    getFilteredTags(text) {
      this.dataTags = this.allTags.filter(option => {
        return option.toLowerCase().includes(text.toLowerCase());
      });
    },
    changeEdit(status) {
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
}
.column.myTag {
  height: 50%;
  border-bottom: dotted 2px rgb(44, 36, 20);
  font-family: "Alegreya Sans", sans-serif;
}
.popular-tag {
  cursor: pointer;
}
h3 {
  color: rgb(238, 153, 16);
  font-weight: bold;
}
</style>
