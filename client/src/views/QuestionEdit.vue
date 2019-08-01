<template>
  <QuestionForm>
    <h3 :name="form-title" class="mb-3 text-center">Edit Question</h3>
  </QuestionForm>
</template>

<script>
import QuestionForm from "@/components/QuestionForm";

export default {
  name: 'question-edit',
  components: {
    QuestionForm
  }
};
</script>

<style scoped>
.tag {
  background-color: #616161;
  border-radius: 3px;
  padding: 2px 10px;
  color: #eee;
  font-weight: 500;
  display: inline-block;
}
.remove-tag {
  font-weight: 600;
  margin-right: 3px;
}
.remove-tag:hover {
  cursor: pointer;
}
</style>
