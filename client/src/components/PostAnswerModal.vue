<template>
    <div>
        <b-modal
            id="modal-post-answer"
            ref="modal"
            title="Post Answer"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            >
            <form ref="form" id="post-answer-form" @submit.stop.prevent="handleSubmit">
							<b-form-group
									:state="answerState"
									label="Answer"
									label-for="answer-input"
									invalid-feedback="Answer is required"
									>
									<b-form-textarea
											id="answer-input"
											v-model="answer"
											:state="answerState"
                      rows="8"
											required
									></b-form-textarea>
							</b-form-group>
            </form>

            <div slot="modal-footer">
							<b-button variant="primary" type="submit" form="post-answer-form">
									Post an Answer
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
      answer: '',
      answerState: null,
    };
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.answerState = valid ? 'valid' : 'invalid';
      return valid;
    },
    resetModal() {
      this.answer = '';
      this.answerState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    postAnswer() {
      return axios({
        method: 'POST',
        url: `${process.env.VUE_APP_SERVER_URL}/answers`,
        	headers: {
          token: this.$store.state.token,
          question: this.$store.state.activeQuestion._id,
        },
        data: {
          answer: this.answer,
        },
      });
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {

      } else {
        this.postAnswer()
          .then(() => {
            this.resetModal();
            this.$swal(
              'Succeed!!!',
              'Your answer has been posted',
              'success',
            );

            this.$emit("fetchAnswers");

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
