<template>
  <div class="text-left">
    <a-comment>
      <a-avatar
        slot="avatar"
        src="https://s3.amazonaws.com/wgvs-inbound-prod/avatars/default/avatar5.png"
        alt="Han Solo"
      />
      <div slot="content">
        <a-form-item>
          <wysiwyg v-model="desc" />
        </a-form-item>
        <a-form-item>
          <a-button
            htmlType="submit"
            :loading="submitting"
            @click="addAnswer(onequestion._id)"
            type="primary"
          >
            Give an Answer
          </a-button>
        </a-form-item>
      </div>
    </a-comment>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'addAns',
  data () {
    return {
      desc: '',
      submitting: false
    }
  },
  computed: {
    ...mapState(["onequestion"])
  },
  methods: {
    addAnswer (id) {
      this.submitting = true

      let data = {
        description: this.desc,
        questionid: id
      }
      this.$store.dispatch('CREATEANSWER', data)
      .then(()=> {
        this.submitting = false
        this.desc = ''
      })
      .catch(err =>{
        this.$message.error(err.response.data.message)
      })
    }
  }
}
</script>

<style>
form{
  padding-bottom: 3rem;
}
</style>
