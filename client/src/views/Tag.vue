<template>
    <div class="tag">
        <div class="container">
            <div class="mt-5 row" style="margin-top: 10px; margin-bottom: 10px">
                <h5>{{status}}</h5>
            </div>
            <div v-for="(question, index) in questions" :key="index">
                <EachQuestion :question="question" :index="index"/>
            </div>
        </div>
    </div>
</template>

<script>
import EachQuestion from '@/components/EachQuestion.vue'
export default {
    data() {
        return {
            status: '',
        }
    },
    computed: {
        questions() {
            let array = []
            for (var i=0; i<this.$store.state.questions.length; i++) {
                if (this.$store.state.questions[i].tags.includes(this.$route.params.tag)) {
                    array.push(this.$store.state.questions[i])
                    console.log(array)
                }
            }
            
            if (array.length === 0) {
                this.status = `Question with tag ${this.$route.params.tag} not found`
            } else {
                this.status = `Tag: ${this.$route.params.tag}`
            }
            console.log(array)
            return array
        }
    },
    components: {
        EachQuestion
    },
    created() {
        this.$store.dispatch("getQuestions")
    }
}
</script>

<style>

</style>
