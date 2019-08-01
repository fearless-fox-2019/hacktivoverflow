<template>
    <div>
        <b-modal
            id="modal-new-question"
            ref="modal"
            title="New Question"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            <form ref="form" id="new-question-form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    :state="titleState"
                    label="Title"
                    label-for="title-input"
                    invalid-feedback="Title is required"
                    >
                    <b-form-input
                        id="title-input"
                        v-model="title"
                        type="text"
                        :state="titleState"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    :state="descriptionState"
                    label="Description"
                    label-for="description-input"
                    invalid-feedback="Description is required"
                    >
                    <b-form-textarea
                        id="description-input"
                        v-model="description"
                        :state="descriptionState"

                        required
                    ></b-form-textarea>
                </b-form-group>
            </form>

            <div slot="modal-footer">
                <b-button variant="primary" type="submit" form="new-question-form">
                    Post a New Question
                </b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      titleState: null,
      description: '',
      descriptionState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.titleState = valid ? 'valid' : 'invalid';
      this.descriptionState = valid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.title = '';
      this.titleState = null;
      this.description = '';
      this.descriptionState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    createNewQuestion() {
      return axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/questions`,
        	headers: {
          token: this.$store.state.token,
        },
        data: {
          title: this.title,
          description: this.description,
        },
      });
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {

      } else {
        this.createNewQuestion()
          .then(() => {
            this.resetModal();
            this.$swal(
              'Succeed!!!',
              'Your question has been posted',
              'success',
            );

            this.$store.dispatch("getQuestions");

            this.$nextTick(() => {
              this.$refs.modal.hide();
            });
          })
          .catch(({ response }) => {
            this.resetModal();
            this.$swal(
              'Error!!!',
              response.data.message,
              'error',
            );
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
