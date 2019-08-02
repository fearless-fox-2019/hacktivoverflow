<template>
    <div class="card">
        <h5 class="card-header">${question.title}</h5>
        <div class="card-body">
            <p class="card-text">${question.description}</p>
            <a href="#" class="btn btn-primary">Question Details</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "questionCard",
    components: {},
    computed: {
        url() {
        return this.$store.state.url;
        }
    },
}
</script>

<style>

</style>
