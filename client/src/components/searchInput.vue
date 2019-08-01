<template>
  <div>
    <a-radio-group buttonStyle="solid" v-model="choose">
      <a-radio-button value="tag">Search By Tag</a-radio-button>
      <a-radio-button value="title">Search By Title</a-radio-button>
    </a-radio-group>
    <br />
    <br />
    <a-input-search
      placeholder="Input search here"
      style="width: 200px"
      @search="onSearch"
    />
  </div>
</template>

<script>
import ax from "@/axiosApi";
export default {
  data() {
    return {
      text: "",
      choose: "tag"
    };
  },
  methods: {
    onSearch(value) {
      console.log(value);
      
      if(this.choose == 'tag'){
        this.text = `tag=${value}`
      }else if(this.choose == 'title'){
        this.text = `title=${value}`
      }
      
      ax.get(`/questions/all?${this.text}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        this.$store.commit('QUESTIONLIST',data)
        this.$router.push(`/tag/${value}`)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style>
</style>
