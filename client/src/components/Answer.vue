<template>
  <div>
    <b-card id="question">
      <b-row>
        <b-col cols="1">
          <i class="material-icons">arrow_drop_up</i>
          <b-button
            class="pt-0 pb-0"
            variant="outline-secondary"
            disabled
            style="width: 56px; border: 0; padding: 0;"
          >
            <h5>{{ answer.votes.length }}</h5>
            <h6 class="m-0">votes</h6>
          </b-button>
          <i class="material-icons">arrow_drop_down</i>
        </b-col>
        <b-col class="ml-4">
          <span style="font-size: 16px;">A: {{ answer.title }}</span>
          <div class="divider"></div>
          <p>{{ answer.description }}</p>
          <div class="mt-2 float-right">
            <h6>
              {{ Date(answer.createdAt)}} by
              <b>{{ answer.author }}</b>
            </h6>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["answer"]
};
</script>

<style>
</style>
