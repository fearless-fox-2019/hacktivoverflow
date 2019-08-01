<template>
  <div class="container">
     <div class="row d-flex justify-content-between">
      <div class="col-lg-9">
        <b-card bg-variant="default" :header="onequestion.title" class="text-left" style="width:48rem">
          <small>{{new Date(onequestion.createdAt).toLocaleString()}}</small>
          <b-card-text v-html="onequestion.description"></b-card-text>
          <div class="d-flex justify-content-left">
          <h5 v-for="(tag,index) in onequestion.tags" :key="index"><b-badge @click="detailTag(tag)" pill variant="success">#{{tag}}</b-badge></h5>
          </div>
          <div class="d-flex justify-content-end">
            <a-tooltip title="upvote"><a-button type="default" icon="caret-up" :loading="loading" @click="upvote(onequestion)" /></a-tooltip>
          <h4> {{upvotes - downvotes}} </h4>
              <a-tooltip title="downvote"><a-button type="default" icon="caret-down" :loading="loading" @click="downvote(onequestion)" /></a-tooltip>
          </div>
          <b-button variant="outline-primary" v-if="checkAuth(onequestion)" @click="showModal(onequestion)"><a-icon type="edit" />edit question</b-button>
        </b-card>
      </div>
    </div>

    <a-modal
    id="modalQ"
      title="Edit Question"
      :visible="visible"
      @ok="handleOk(onequestion)"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form>
        <a-form-item label="Title" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="title"
            v-decorator="[
          'Title',
          {rules: [{ required: true, message: 'Please input the title!' }]}
        ]"
          />
        </a-form-item>

        <wysiwyg v-model="desc" /><br>
        <span v-for="(tag,index) in tags" :key="index">
        <a-badge :count="tag" :numberStyle= "{backgroundColor: 'green'} " />
        <a-icon type="close-circle" @click="deletetag(tag)"/>
        </span><br><br>
        Tags 
        <a-input v-model="msg"
      placeholder="press enter per tag"
      style="width: 200px" @keyup.enter="pushTag"
    />
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ax from "@/axiosApi";

export default {
  name: "detailQ",
  data() {
    return {
      title: "",
      desc: "",
      msg: "",
      tags:[],
      loading: false,
      visible: false,
      confirmLoading: false
    };
  },
  computed: {
    ...mapState(["upvotes", "downvotes", "onequestion","isLogin","isUser"])
  },
  created() {
    // this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId);
  },
  methods: {
    checkAuth(data){
      if(this.isUser == data.user_id._id){
        return true
      }else{
        return false
      }
    },
    showModal(question) {
      this.title = question.title;
      this.desc = question.description;
      this.tags = question.tags || []
      this.visible = true;
    },
    handleOk(data) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.editQuestion(data)
      }, 1000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    pushTag(){
      this.tags.push(this.msg)
      this.msg = ''
    },
    deletetag(tag){
      let index = this.tags.indexOf(tag);
      this.tags.splice(index, 1);
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
    },
    upvote(data) {
      this.loading = true
      console.log(this.$route.params.questionId,'upvote');
      
      ax.patch(
        `questions/upvote/${data._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          console.log(data);
          this.loading = false
          this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId);
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.response.data.message)
          this.loading = false
        });
    },
    downvote(data) {
      ax.patch(
        `questions/downvote/${data._id}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      )
        .then(({ data }) => {
          this.$store.dispatch("GETONEQUESTION", this.$route.params.questionId);
          console.log(data);
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.response.data.message)
          this.loading = false
        });
    },
    editQuestion(data) {
      let dataQ = {
        id: data._id,
        title: this.title,
        desc: this.desc,
        tags: this.tags
      };
      this.$store.dispatch("EDITQUESTION", dataQ)
      .then(({ data }) => {
          this.visible = false;
          this.confirmLoading = false;
        })
        .catch(err => {
          this.confirmLoading = false;
          this.$message.error(err.response.data.message);
        });
    }
  }
};
</script>

<style>
h4{
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>
