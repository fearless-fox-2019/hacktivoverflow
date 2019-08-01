<template>
	<b-modal :id="'modal-'+detail.id" :title="detail.title" @ok="execute()">
		<p class="my-4">{{ detail.message }}</p>
	</b-modal>
</template>

<script>
export default {
  props: ['detail'],
  methods: {
    execute() {
      this.$emit('execute');
    },
  },
};
</script>

<style>

</style>
