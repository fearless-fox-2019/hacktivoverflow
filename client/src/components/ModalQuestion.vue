<template>
    <b-modal id="modal-question" ref="modal-question" title="Ask Question">
        <b-form id="form-question" @submit.prevent="askQuestion">
            <label for="title">Question</label>
            <b-form-input v-model="title" id="title" type="text"></b-form-input>
            <label for="title" class="mt-2">Description</label>
            <wysiwyg v-model="description" id="detail" ></wysiwyg>
        </b-form>
        <div slot="modal-footer">
            <b-button form="form-question" size="sm" variant="primary" type="submit">Ask</b-button>
            <b-button @click="$refs['modal-question'].hide()" size="sm" variant="danger" class="ml-2">Close</b-button>
        </div>
    </b-modal>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            title: '',
            description: '',
        }
    },
    methods: {
        askQuestion() {
            console.log('Ask Question!')
            console.log(this.title)
            console.log(this.description)
            axios({
                method: 'post',
                url: 'http://localhost:3000/api/questions',
                data: {
                    title: this.title,
                    description: this.description,
                    author: localStorage.getItem('username'),
                }
			})
			.then( ({ data }) => {
                console.log(data)
				this.$refs['modal-question'].hide()
			})
			.catch( err => console.log(err) )
    },
  },
};
</script>

<style>

</style>
