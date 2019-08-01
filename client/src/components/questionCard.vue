<template>
    <div class="columns card">
          <div class="column is-2 counterparent" >
            <div class="counter1">
              <h2 class="counter">{{totalVote}}</h2>
              <h2 class="counter">Votes</h2>
            </div>
            <div class="coutner2">
              <h2 class="counter">{{question.answers.length}}</h2>
              <h2 class="counter">Answers</h2>
            </div>
          </div>
          <div class="column questioncard">
            <h1 class="title"  @click="detailQuestion(question._id)">{{question.title}}</h1>
            <div class="tags">
              <div class="tag is-info" v-for="(tag,i) in question.tags" :key="i" @click="tagSearch(tag)">{{tag}}</div>
            </div>
          </div>
        </div>
</template>

<script>
export default {
    props: [`question`],
    methods: {
      detailQuestion(questionId){
        console.log(questionId,'ini qustionIdn nyaZ')
        this.$router.push(`/question/${questionId}`)
      },
      tagSearch(tag){
        console.log(tag,' ini tag yang dicari')
        this.$router.push('/search/tag?tag='+tag)
      }
    },
    computed: {
        totalVote(){
            return this.question.upVote.length - this.question.downVote.length
        }
    }
}
</script>

<style scoped>
.title{
  font-size: 18px;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 700px;
}
.card {
  margin: 10px !important;
  min-height: 70px;
}
.counterparent {
  display: flex;
  justify-content: center;
}
.counter {
  font-size: 10px;
  margin: 5px;
}
.tags {
  display: flex;
  margin-top: 10px;
}
.tag{
  cursor: pointer;
}
.questioncard {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
