<template>
  <div>
    <a-button type="primary" @click="showModal">Ask Question</a-button>
    <a-modal
      id="modalQ"
      title="New Question"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="Title" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input
            v-model="title"
            v-decorator="[
          'Title',
          {rules: [{ required: true, message: 'Please input the title!' }]}
        ]"
          />
        </a-form-item>

        <wysiwyg v-model="desc" />
        <br />
        <span v-for="(tag,index) in tags" :key="index">
          <a-badge :count="tag" :numberStyle="{backgroundColor: 'green'} " />
          <a-icon type="close-circle" @click="deletetag(tag)" />
        </span>
        <br />
        <br />Tags
        <a-input
          v-model="msg"
          placeholder="press enter per tag"
          style="width: 200px"
          @keyup.enter="pushTag"
        />
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "addQue",
  data() {
    return {
      title: "",
      desc: "enter your question here..",
      msg: "",
      tags: [],
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false
    };
  },
  methods: {
    pushTag() {
      this.tags.push(this.msg);
      this.msg = "";
    },
    deletetag(tag) {
      let index = this.tags.indexOf(tag);
      this.tags.splice(index, 1);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.addQuestion();
      }, 1000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
    addQuestion() {
      let data = {
        title: this.title,
        description: this.desc,
        tags: this.tags
      };
      this.$store
        .dispatch("CREATEQUESTION", data)
        .then(({ data }) => {
          this.visible = false;
          this.confirmLoading = false;
          this.title = "";
          this.desc = "enter your question here..";
          this.tags = [];
        })
        .catch(err => {
          this.$message.error(err.response.data.message);
          this.confirmLoading = false;
        });
    }
  }
};
</script>

<style>
.ant-modal-content {
  width: 570px;
}
</style>
