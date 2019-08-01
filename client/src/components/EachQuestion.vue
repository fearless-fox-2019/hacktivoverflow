<template>
  <div>
    <b-card  v-if='this.question.creator' style="background: gainsboro; color: white; margin-bottom: 7px">
      <div class="row">
        <div class="col-8" @click.prevent='toCurrentQuestion'>
          <b-card-text style=" color: white">
            <a href="" style="color: white"><h5>{{question.title}}</h5></a>
            <p class='text-muted'>Asked by: {{question.creator.name}}</p>
            <h6 class='text-muted'>Vote: {{vote}}</h6>
          </b-card-text>
        </div>
        <div class="col-4" style="display: flex; flex-wrap: wrap; justify-content: flex-end">
          <b-list-group horizontal="md" style="display: flex; flex-wrap: wrap; justify-content: flex-end">
            <b-list-group-item v-for="(tag, index) in question.tags" :key="index" style="background: gainsboro !important; color: white !important; height: 50px; border: none; text-decoration: none"><a style="text-decoration: none !important; color: white" href="" @click.prevent="seeTag(tag)">{{tag}}</a></b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>

export default {
    props:['question'],
    computed:{
        vote(){
            return this.question.upvotes.length - this.question.downvotes.length
        }
    },
    methods:{
      toCurrentQuestion(){
        this.$router.push(`/question/${this.question._id}`)
      },
      seeTag(tag){
        this.$router.push(`/tag/${tag}`)
      }
    }
};
</script>