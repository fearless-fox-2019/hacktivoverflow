<template>
  <div class="box">
    <div class="columns is-multiline">
      <div class="column is-2 question-number" style="padding: 0.75rem 0.25rem">
        <div class="answer">
          <h1>
            {{question.answer.length}}
          </h1>
          <small>Answer</small>
        </div>
        <div class="votes">
          <h1>
            {{question.upvotes.length - question.downvotes.length}}
          </h1>
          <small>Votes</small>
        </div>
      </div>
      <div class="column is-10 question-content">
        <h2>
          <!-- <router-link @click.prevent="selectQuestion(question._id)"> -->
            <a @click.prevent="selectQuestion(question._id)">{{question.title}}</a>
          <!-- </router-link>> -->
        </h2>
        <p v-html="question.question" v-line-clamp:20="2"></p>
        <div class="question-details">
          <small class="text-muted"> Asked : {{ question.updatedAt.split('T')[0] | moment('from', 'now') }}</small>
          <small class="text-muted"> By : {{ question.author.fullname }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    selectQuestion(id) {
      this.$store.commit('selectQuestion', id);
    },
  },
};
</script>

<style>
  .column.is-2.question-number {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    height: inherit;
    justify-content: space-evenly;
  }

  .question-content {
    text-align: start;
  }

  .question-content h2 {
    font-weight: 600;
    font-size: 1.25em
  }

  small {
    font-size: 0.75em !important;
  }

  .question-details {
    margin-top: 2.5vh;
    display: flex;
    flex-direction: column;
  }
</style>
