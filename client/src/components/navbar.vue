<template>
  <div class="container is-fullhd">
    <div class="notification">
      <div class="logo">
        <h2 @click="tohome">Hoverflow</h2>
      </div>
      <div class="field has-addons" v-show="$store.state.isLogin">
        <form @submit.prevent="search">
          <div class="control">
            <input v-model="searchbar" class="input" type="text" placeholder="Find question..." />
          </div>
          <div class="control">
            <a class="button" @click="search">Search</a>
          </div>
        </form>
      </div>
      <div class="menu">
        <h4 class="menubutton" v-show="!$store.state.isLogin" @click="tosign">Login / Register</h4>
        <h4 class="menubutton" v-show="$store.state.isLogin" @click="tologout">LogOut</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return{
          searchbar: ''
      }
  },
  methods: {
    tosign() {
      // this.$dialog.alert('menuju form login')
      this.$router.push("/sign");
    },
    tohome() {
      // this.$dialog.alert('meunju home')
      console.log(this.$store.state.isLogin)
      if (this.$store.state.isLogin) {
        this.$router.push("/home");
      }
      else {
        this.$router.push("/");
      }
    },
    tologout() {
      localStorage.removeItem("token");
      this.$router.push("/");
      this.$store.commit("changeLogin");
    },
    search() {
      console.log(this.searchbar,'ini yang akan dicari');
      this.$store.dispatch('gettitlesearch',this.searchbar)
    //   this.$router.push('/search/titile')
    this.searchbar = ''
    }
  },
  created() {
    if (!localStorage.getItem("token")) {
      // this.$router.push('/')
    }
  }
};
</script>

<style scoped>
form{
    display: flex;

}
.notification {
  padding: 15px 15px;
  background-color: #333 !important;
  border-radius: 0px !important;
  color: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin-bottom: 12px;
}
.field {
  max-height: 30px;
  margin: 0px !important;
}
.logo {
  cursor: pointer;
}
.menu {
  cursor: pointer;
}
.menubutton {
  cursor: pointer;
}
.button {
  padding: 0px 5px;
  height: 30px;
  background-color: bisque;
}
.input {
  padding: 0px 5px;
  height: 30px;
  width: 50px;
}
.input:focus {
  width: 300px;
}
</style>
