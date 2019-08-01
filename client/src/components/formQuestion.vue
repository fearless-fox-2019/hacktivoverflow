<template>
    <div style="width: 800px">
        <form @submit.prevent="sendData" class="has-text-left">
            <b-field class="has-text-left" label="Title :">
                <b-input v-model="question.title" maxlength="200" type="text"></b-input>
            </b-field>
            <b-field  class="has-text-left" label="Description :"></b-field>
            <wysiwyg v-model="question.description" />
            <b-field class="has-text-left" label="Add some tags :">
                <b-taginput
                    v-model="question.tags"
                    ellipsis
                    icon="label"
                    placeholder="Question Tags">
                </b-taginput>
            </b-field>
            <div style="display: flex; flex-direction: row-reverse; margin-right: 30px">
                <b-button @click="cancel" type="is-info">Cancel</b-button>
                <input type="submit" value="Post" class="button is-success" style="margin-right: 10px"/>
            </div>
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
        },
        cancel(){
            this.$router.push('/home')
        }
    }
}
</script>

<style>

</style>
