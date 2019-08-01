<template>
  <div class="tagside">
    <div class="watchedtag">
      <h1 class="title">Watched Tag:</h1>
      <div class="tags" v-if="$store.state.logedUser.watchTag.length !== 0">
        <div class="tag is-danger" @click="showcross">removeTag</div>
        <div class="tag is-warning" @click="showform">+newTag</div>
        <div class="tag" v-for="(tag,i) in $store.state.logedUser.watchTag" :key="i">
          <p>
            <a @click="searchTag(tag)">
              {{tag}}
              <i class="far fa-times-circle" v-if="removetag"></i>
            </a>
          </p>
        </div>
      </div>
      <a v-if="$store.state.logedUser.watchTag.length == 0 && !tagform">
        <i @click="showform" class="fas fa-plus-circle"></i>
      </a>
      <h3 v-if="$store.state.logedUser.watchTag.length == 0 && !tagform">Add some tag</h3>
      <section v-show="tagform">
        <b-field label="Enter some tags">
          <b-taginput
            v-model="tags"
            :data="filteredTags"
            autocomplete
            :allow-new="allowNew"
            field="user.first_name"
            icon="label"
            placeholder="Enter to add tag"
            @typing="getFilteredTags"
          ></b-taginput>
        </b-field>
        <b-button @click="newtag">Save</b-button>
      </section>
    </div>
    <hr />
    <div class="alltag">
      <h1 class="title">All tags:</h1>
      <div class="tags">
        <div
          class="tag"
          v-for="(tag,i) in $store.state.allTags"
          :key="i"
          @click="searchTag(tag)"
        >{{tag}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readyremove: false,
      removetag: false,
      tagform: false,
      filteredTags: this.$store.state.allTags,
      isSelectOnly: false,
      tags: [],
      allowNew: true
    };
  },
  methods: {
    showcross() {
      if (this.removetag) {
        this.removetag = false;
        this.readyremove = false;
      } else {
        this.removetag = true;
        this.readyremove = true;
      }
    },
    getFilteredTags(text) {
      this.filteredTags = this.$store.state.allTags.filter(option => {
        return option.includes(text);
      });
      //   this.tagform = false
    },
    showform() {
      if (this.tagform) {
        this.tagform = false;
      } else {
        this.tagform = true;
      }
    },
    searchTag(tag) {
      console.log(tag,this.readyremove, "ini yang dicari yak");
      if (this.readyremove) {
          console.log(tag)
          this.$store.dispatch('deletetag',tag)
      } else {
        this.$router.push("/search/tag?tag=" + tag);
      }
    },
    newtag() {
      this.$store.dispatch("newtag", this.tags);
      this.tags = [];
      this.tagform = false;
    },
  },
  mounted() {
    this.$store.dispatch("getTags");
    // this.$store.dispatch("whoami");
  }
};
</script>

<style scoped>
.watchedtag {
  min-height: 10vh;
  margin: 20px auto;
  margin-right: 20px;
  padding: 12px;
  border: 1px solid hotpink;
}
.alltag {
  min-height: 10vh;
  margin: 20px auto;
  margin-right: 20px;
  padding: 12px;
  border: 1px solid hotpink;
}
.title {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}
.tags {
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.09); */
  /* padding: 5px;
  margin: 10px; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  cursor: pointer;
}
.fas {
  font-size: 35px;
  cursor: pointer;
}
h3 {
  margin-bottom: 10px;
}
</style>
