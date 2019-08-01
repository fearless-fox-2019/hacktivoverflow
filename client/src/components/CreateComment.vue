<template>
    <div>
        <b-card>
            <label> Title </label>
            <b-input v-model="formAnswer.title" placeholder="Title your answer . . ."></b-input>
            <label> Answer </label>
            <b-textarea v-model="formAnswer.description" placaholder="Your Answer in Here"></b-textarea>
            <b-button @click="create" variant="primary"> Submit </b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    props: ['idquestion'],
    data(){
        return{
            formAnswer: {
                questionid: this.idquestion,
                title: '',
                description: ''
            }
        }
    },
    methods:{
        create(){
            console.log('masuk sini: ', this.formAnswer)
            this.$store.dispatch('addAnswer', this.formAnswer)
        }
    }
}
</script>

<style>

</style>
