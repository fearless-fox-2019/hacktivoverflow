<template>
  <a-card title="Watched Tags">
    <a slot="extra" >
      <a-input
        v-if="inputVisible"
        v-model="tag"
        type="text"
        size="small"
        :style="{ width: '78px' }"
        @keyup.enter="addNewTag"
      />
      <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
        <a-icon type="plus" />New Tag
      </a-tag>
    </a>
    <a-card-grid
      style="width:33,3%; height: 78px; "
      v-for="(tag,index) in tags"
      :key="index"
    ><b @click="detailTag(tag)">#{{tag}} </b><a-icon type="close-circle" @click="deletetag(tag)"/></a-card-grid>
  </a-card>
</template>

<script>
import ax from "@/axiosApi";
import { mapState } from "vuex";

export default {
  data() {
    return {
      inputVisible: false,
      tag: "",
      tags: []
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  created() {
    ax.get("/users", {
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        this.tags = data.watchedTags;
      })
      .catch(err => {
        this.$message.error(err.response.data.message);
      });
  },
  methods: {
    showInput() {
      this.inputVisible = true;
    },
    updateTags(){
      ax.patch(
        `/users`,
        {
          tags: this.tags
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          this.tags = data.watchedTags;
        })
        .catch(err => {
          this.$message.error(err.response.data.message);
        });
    },
    addNewTag() {
      this.tags.push(this.tag);
      this.tag = "";
      this.updateTags()
    },
    deletetag(tag){
      let index = this.tags.indexOf(tag);
      this.tags.splice(index, 1);
      this.updateTags()
    },
    detailTag(tag){
      ax.get(`/questions/all?tag=${tag}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        this.$store.commit('QUESTIONLIST',data)
        this.$router.push(`/tag/${tag}`)
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
