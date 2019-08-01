<template>
  <div class="column" style="text-align: start; margin-left: 5vw; margin-bottom: 10vh">
    <b-loading :active.sync="isLoading">
      <b-icon
        pack="fas"
        icon="circle-notch"
        size="is-large"
        custom-class="fa-spin">
      </b-icon>
    </b-loading>
    <!-- <br><br><br><br>
    <h1>
      {{getSelected}}

    </h1> -->
    <div class="columns is-multiline">
      <div class="column is-1">
        <div class="display-vote">
          <a
            @click.prevent="vote('up')">
            <b-icon
              pack="fas"
              icon="sort-up"
              size="is-large">
            </b-icon>
          </a>
          <h6 style="font-size: 2em; text-align: center; padding-left:7.5px">{{getSelected.upvotes.length - getSelected.downvotes.length}}</h6>
          <a
            @click.prevent="vote('down')">
            <b-icon
              pack="fas"
              icon="sort-down"
              size="is-large">
            </b-icon>
          </a>
        </div>
      </div>
      <div class="column is-11 title-detail" style="display: flex; flex-direction: column; justify-content: center; padding-left: 5vw">
        <h1>{{ getSelected.title }}</h1>
      </div>
    </div>
    <div class="column is-1"></div>
    <div class="column is-11 is-offset-1" style="padding-left:7.5px">
      <h1 v-html="getSelected.question"></h1>
    </div>
    <div class="column info-author is-6 is-offset-1">
      <h1>Posted by : {{getSelected.author.fullname}}</h1>
      <small>@{{getSelected.author.username}}</small><br>
      <small class="text-muted"> Asked : {{ getSelected.updatedAt.split('T')[0] | moment('from', 'now') }}</small>
    </div>
    <div class="columns is-11 is-offset-1 is-multiline" style="margin-top: 5vh;">
      <div class="column is-5 is-offset-1">
        <h1>Answers :</h1>
      </div>
      <div v-if="isLogin" class="column is-5" style="display: flex; justify-content: flex-end">
        <b-button
          type="is-primary"
          v-if="isAnswering === false"
          @click.prevent="isAnswering = true">
          Answer Question
        </b-button>
        <b-button
          type="is-primary"
          v-if="isAnswering === true"
          @click.prevent="answerQuestion">
          Submit Answer
        </b-button>
      </div>
      <div v-if="isAnswering === true" class="column is-10 is-offset-1">
        <b-field label="Provide A Solution For The Problem(s)">
          <quill v-model="form.answer" output="html" style="height: 50vh;" :config="config"></quill>
        </b-field>
      </div>
      <div v-if="getSelected.answer.length > 0" class="column is-10 is-offset-1">
        <div v-for="answer in getSelected.answer" :key="answer._id">
          <card-answer :answer="answer"></card-answer>
        </div>
      </div>
      <div v-if="getSelected.answer.length === 0 && isAnswering === false" class="column is-12" style="text-align: center">
        <p style="color: #222, opacity: 0.5">This Question Haven't Received Any Answers</p>
      </div>
    </div>
  </div>
</template>

<script>
import CardAnswer from './Card-Answer-Main.vue';
import { mapState } from 'vuex';

export default {
  created () {
    this.$store.dispatch('getSelectedQuestion', this.$route.params.id)
  },
  data() {
    return {
      isAnswering: false,
      form: {
        answer: null,
      },
      config: {
        placeholder: 'Insert Your Code Here',
          modules: {
          // syntax: true,
          toolbar: [ 
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [
              { 'list': 'ordered'},
              { 'list': 'bullet' }
            ],
          ]
        },
      }
    }
  },
  methods: {
    vote(value) {
      const payload = {
        id: this.$route.params.id,
        value
      }
      this.$store.dispatch('vote', payload)
    },
    answerQuestion() {
      this.isAnswering = false; 
      const payload = {
        questionId: this.$route.params.id,
        answer: this.form.answer
      }
      this.$store.dispatch('sendAnswer', payload)
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isLogin: state => state.isLogin,
      // selected: state => state.selected
    }),
    getSelected() {
      return this.$store.getters.getSelected(this.$route.params.id) 
    }
  },
  watch: {
    '$route.params.id': function (id) {
      // console.log(id);
    }
  },
  components: {
    CardAnswer,
  }
}
</script>

<style>
  .display-vote {
    display:flex; flex-direction: column; justify-content: center
  }

  .title-detail h1 {
    font-size: 2em;
    font-weight: 600;
  }

  .info-author {
    padding: 15em;
    background-color: #efefef;
  }

  .answer-form {
  }
</style>
