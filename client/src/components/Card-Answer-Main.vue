<template>
  <div class="box" style="margin-top: 2.5vh">
    <div class="columns is-multiline">
      <div class="column is-2 question-number" style="padding: 0.75rem 0.25rem">
        <div class="votes" style="text-align: center">
          <a
            @click.prevent="vote('up', answer._id)">
            <b-icon
              pack="fas"
              icon="sort-up"
              size="is-medium">
            </b-icon>
          </a>
          <h6 style="font-size: 1em; text-align: center;">{{answer.upvotes.length - answer.downvotes.length}}</h6>
          <a
            @click.prevent="vote('down', answer._id)">
            <b-icon
              pack="fas"
              icon="sort-down"
              size="is-medium">
            </b-icon>
          </a>
        </div>
      </div>
      <div class="column is-10 question-content">
        <h2>{{answer.title}}</h2>
        <p v-html="answer.answer" v-line-clamp:20="2"></p>
        <div class="question-details">
          <small class="text-muted"> Answered by : {{ answer.updatedAt.split('T')[0] | moment('from', 'now') }}</small>
          <small class="text-muted"> By : {{ answer.author.fullname }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer'],
  methods: {
    vote(value, id) {
      const payload = {
        id,
        value,
      };
      this.$store.dispatch('voteAnswer', payload);
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
