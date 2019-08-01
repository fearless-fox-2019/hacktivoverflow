<template>
  <div class="home">
    <SidebarMenu style="top:65px; height:92vh" :menu="menu" />
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <div class="container-grid">
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="9">
            <Home msg="Welcome to Your Vue.js App" />
            <router-view />
          </b-col>
          <b-col>
            <!-- <Home msg="Welcome to Your Vue.js App" /> -->
            <b-card-group deck>
              <b-card
                :title="$store.state.quotes.by"
                :img-src="$store.state.quotes.pic"
                img-alt="Image"
                img-top
              >
                <b-card-text>{{$store.state.quotes.quote}}</b-card-text>
                <div slot="footer">
                  <small class="text-muted">quotes of the seconds</small>
                </div>
              </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/Home.vue";
import Sidebar from "@/components/Sidebar.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
export default {
  created() {
    this.$store.dispatch("GET_QUESTION");
  },
  name: "home",
  components: {
    Home,
    Sidebar,
    SidebarMenu
  },
  data() {
    return {
      menu: [
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        }
      ]
    };
  },
  computed: {
    filteredList() {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  }
};
</script>
<style scoped>
.container-grid {
  margin-left: 150px;
}
.v-sidebar-menu .collapse-btn {
  background-color: white;
}
</style>

