<template>
  <div class="container-question">
    <h3 class="mb-3 text-center">Ask Question</h3>
    <form @submit.prevent="submitQuestion">
      <div class="form-group">
        <label for="questionTitle">Title:</label>
        <input
          type="text"
          class="form-control"
          id="questionTitle"
          v-model="question.title"
          placeholder="Enter title"
          required
        />
      </div>
      <div class="form-group d-flex justify-content-start flex-column">
        <label for="questionDescription">Question:</label>
        <textarea
          placeholder="What's your question?"
          id="questionDescription"
          v-model.trim="question.description"
          style="padding: 10px; 
                        display:block;
                        overflow:auto;
                        resize:none"
          class="form-control"
          rows="10"
        ></textarea>
      </div>

      <label for="questionTags">Tags:</label>
      <div class="input-group mb-3" style="width: 20em;">
        <input
          type="text"
          class="form-control"
          placeholder="Eg. Javascript, Vue, React"
          aria-label="tags"
          aria-describedby="button-addon2"
          v-model.trim="tagValue"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click.prevent="clickAddTags"
            id="button-addon2"
          >Add</button>
        </div>
      </div>

      <div v-show="this.question.tags !== undefined" class="d-flex">
        <div v-for="(tag, index) in this.question.tags" class="tag d-flex flex-row" :key="index">
          <div>
            {{tag.toLowerCase()}}
          </div>
          <div
            class="remove-tag"
            @click="removeTag(tag)"
            style="display:inline-block; margin-left: 15px"
          >x</div>
        </div>
      </div>

      <div class="pull-right" style="margin-top: 20px">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: {
        title: '',
        description: '',
        tags: []
      },
      tagValue: ''
    };
  },
  methods: {
    clickAddTags() {
      if (!this.question.tags) this.question.tags = [];
      if (this.tagValue.split('').some(el => el == ',')) {
        this.question.tags = [
          ...new Set(
            (this.question.tags = this.tagValue.split(',').map(el => el.trim()))
          )
        ];
      } else this.question.tags.push(this.tagValue.toLowerCase());
      this.tagValue = '';
    },
    removeTag(tagName) {
      this.tagValue = '';
      this.question.tags = this.question.tags.filter(tag => tag !== tagName);
    },
    submitQuestion() {
      this.$store
        .dispatch('addNewQuestion', this.question)
        .then(() => {
          if (!this.$store.getters.error) {
            this.$alertify.success(`Question published`);
            this.$router.push('/');
          }
        })
        .catch(() => {
          this.$alertify.error(
            `Failed, please check your internet connection or try again`
          );
        });
    }
  }
};
</script>

<style scoped>
.tag {
  background-color: #616161;
  color: #fff;
  border-radius: 4px;
  display: inline-block;
  margin-top: 5px;
  padding: 2px 12px;
  margin-right: 8px;
  font-size: 13px;
  padding: 2px 8px;
}
.tag:hover {
  /* cursor: pointer; */
  background-color: #4b4b4b;
}
.remove-tag {
  font-weight: 600;
}
.remove-tag:hover {
  cursor: pointer;
}
.container-question {
  padding-top: 50px;
  padding-left: 425px;
  padding-right: 425px;
}
label {
  display: flex;
}
</style>
