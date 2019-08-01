<template>
  <div id="answer">
    <div v-if="loginUserId === questionId">
    <div>You can't answer your own question</div>
  </div>
  <div v-else-if="loginUserId===undefined">
    <div>Please login to answer</div>
  </div>
  <div v-else>
    <div class="mt-5" style="margin: 0 !important">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      ><i class="fas fa-plus my-icon"></i>Answer</button>
    </div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document" style="margin-top: 100px; max-width: 600px !important">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Answer Form</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              
                <form @submit.prevent="submitAnswer">
                  <div class="form-group" style="margin-bottom: 0px">
                    <textarea
                      placeholder="Enter your answer"
                      style="padding: 10px; overflow:auto; resize:none; margin-bottom: 10px"
                      class="form-group"
                      cols="65"
                      rows="10"
                      v-model="description"
                    ></textarea>
                  </div>
                  <div class="modal-footer" style="padding-bottom: 0">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button class="btn btn-primary">Submit Answer</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import myaxios from '@/apis/localhost';

export default {
  props: ['question-id', 'login-user-id'],
  data() {
    return {
      description: ''
    };
  },
  methods: {
    submitAnswer() {
      myaxios.defaults.headers.common.token = localStorage.token;

      myaxios
        .post(`/answers/${this.$route.params.id}`, {
          description: this.description
        })
        .then(({ data }) => {
          this.$store.commit('ADD_ANSWERS', data);
          this.description = '';
          this.$alertify.success('Answer submitted');
          $('#exampleModal').modal('toggle');
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  }
};
</script>

<style scoped>
.my-icon {
  margin-right: 10px
}
</style>
