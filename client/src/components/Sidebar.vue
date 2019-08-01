<template>
  <div id="sidebar-container">
    <div id="popular" >
      <p id="title">Weekly Popular</p>
      <div id="list">
        <PopularQuestion v-for="post in stack" :key="post._id" :post="post"/>
      </div>
    </div>
    <div id="watch-tags" v-if="watchTags.length > 0">
      <p>Watched Tags : </p>
      <div>
        <b-taglist>
          <b-tag type="is-primary" v-for="(tag, index) in watchTags" :key="index"> {{tag}} </b-tag>
        </b-taglist>
      </div>
      <b-button rounded type="is-danger" size="is-small" icon-left="close" id="clear" @click="clear">clear</b-button>
    </div>
  </div>
</template>
<script>
import PopularQuestion from '@/components/PopularQuestion.vue'
import { mapGetters, mapState } from "vuex";
export default {
  name: 'sideContent',
  computed : {
    posts() {
      return this.$store.getters.top('all').slice(0, 4)
    },
    ...mapState(['watchTags', 'stack'])
  },
  components : {
    PopularQuestion
  },
  methods : {
    clear() {
      this.$store.commit('CLEARWATCHTAGS')
    }
  }
}
</script>

<style lang="scss" scoped>
  $primary: #311B92;
  #sidebar-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border-radius: 15px;
  }

  #popular {
    border: 2px solid $primary;
    border-radius: 15px;
  }
  #title {
    color: white;
    background-color: $primary;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    border-bottom: 1.5px solid rgba(49, 27, 146, 0.842);
    padding: 5px;
  }

  #watch-tags {
    padding: 1em;
  }
  #clear {
    margin: 1em 0;
  }
</style>
