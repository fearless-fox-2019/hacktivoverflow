<template>
  <div class="columns is-multiline">
    <div class="column is-3 sidebar">
      <side-bar></side-bar>
    </div>
    <div class="column is-9 fixnav">
      <Main></Main>
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '../components/Side-Bar.vue';
import Main from '../components/Main.vue';
import { mapState } from 'vuex';

export default {
  name: 'home',
  components: {
    SideBar,
    Main,
  },
};
</script>

<style>
  .sidebar {
    padding-top: 2vh;
    background-color: #efefef;
    height: 93vh;
    position: fixed;
    overflow-y: scroll;
  }
  .side-nav{
    padding: 5%;
    text-align: start;
  }

  .side-nav h1 {
    font-weight: 600;
    font-size: 1.25em;
    /* color: #211B31; */
  }
  .side-nav a h1 {
    /* color: #211B31; */
    font-weight: 600;
    text-align: start;
    font-size: 1em;
  }

  .fixnav {
    padding-top: 2vh !important;
    margin-left: 22.5vw
  }
</style>
