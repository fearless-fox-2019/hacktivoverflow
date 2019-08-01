<template>
  <div>
    <a-list
    class="demo-loadmore-list"
    itemLayout="horizontal"
  >
  <a-list-item style="border: 1;borderStyle: outset;" >
      <a slot="actions" href="/" @click.prevent="showDetail(dataquestion._id)">see more</a>
      <a-popconfirm slot="actions" title="Are you sure delete this task?" @confirm="deleteQuestion(dataquestion._id)" okText="Yes" cancelText="No">
      <a href="/" v-if="checkAuth(dataquestion)">delete</a>
  </a-popconfirm>
      <a-list-item-meta
        :description="dataquestion.title"
      >
        <a slot="title" href="https://vue.ant.design/">{{dataquestion.user_id.username}}</a>
        <a-avatar slot="avatar" src="https://s3.amazonaws.com/wgvs-inbound-prod/avatars/default/avatar5.png" />
      </a-list-item-meta>
      <div>{{dataquestion.upvotes.length}} upvotes</div>
    </a-list-item>
  </a-list>
  </div>
</template>

<script>
export default {
  name: 'eachQ',
  props: ['dataquestion'],
  methods: {
    showDetail (id) {
      this.$router.push({ path: `/details/${id}` })
    },
    deleteQuestion(id){
      this.$store.dispatch('DELETEQUESTION',id)
    },
    checkAuth(data){
      if(localStorage.getItem('user') == data.user_id._id){
        return true
      }else{
        return false
      }
    }
  }
}
</script>

<style>
.demo-loadmore-list{
  padding-top: 30px;
  /* min-height: 90px; */
  /* padding-bottom: 150px; */
  width: 550px;
  text-align: left;
}
.demo-loadmore-list h4{
  padding-left: 0;
}
</style>
