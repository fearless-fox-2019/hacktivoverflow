<template>
    <div style="width: 800px">
        <form @submit.prevent="sendData">
            <b-field class="has-text-left" label="Title">
                <b-input v-model="question.title" maxlength="200" type="text"></b-input>
            </b-field>
            <b-field  class="has-text-left" label="Description"></b-field>
            <wysiwyg v-model="question.description" />
            <b-field class="has-text-left" label="Add some tags">
                <b-taginput
                    v-model="question.tags"
                    ellipsis
                    icon="label"
                    placeholder="Question Tags">
                </b-taginput>
            </b-field>
            <input type="submit" value="Post" />
        </form>
    </div>
</template>

<script>

export default {
    name: 'formQuestion',
    props: ['question'],
    methods:{
        sendData(){
            
            this.$emit('gotData', this.question)
        }
    }
}
</script>

<style>

</style>
