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
          <router-link :to="`/question/${question._id}`">
            <a>{{question.title}}</a>
          </router-link>
        </h2>
        <p v-html="question.question" v-line-clamp:20="2"></p>
        <div class="question-details">
          <small class="text-muted"> Asked : {{ question.updatedAt.split('T')[0] | moment('from', 'now') }}</small>
          <small class="text-muted"> By : {{ question.author.fullname }}</small>
        </div>
        <div style="display: flex; justify-content: flex-end">
          <router-link :to="`/edit-question/${question._id}`">
            <b-button type="is-warning" style="margin: 0 2%" has-link="true">
              Edit
            </b-button>
          </router-link>
          <b-button @click.prevent="deleteQuestion(question._id)" type="is-danger" style="margin: 0 .5%">
            Delete
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question'],
  methods: {
    deleteQuestion(id) {
      console.log(id);
      this.$store.dispatch('deleteQuestion', id)
    }
  },
}
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

  /* .votes {
    margin-top: 2vh;
  } */

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
