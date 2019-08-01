<template>
    <div v-if="show === true" class="container" style="padding-top: 50px;">
        <br>
        <b-card>
            <b-form  >
            <b-form-group
                id="input-group-1"
                label="Title:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="newData.title"
                type="text"
                required
                placeholder="edit title"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Description :" label-for="input-2">
                <b-textarea
                v-model="newData.description"
                required
                placeholder="edit description"
                ></b-textarea>
            </b-form-group>
            <b-input v-model="newData.tags" placeholder=" also input your last tag"></b-input>
            <p>{{newData}} form Title:{{dataEdit.title}} Description: {{dataEdit.description}} Tags: {{dataEdit.tags}}</p>
            <b-button @click="onSubmit(dataEdit._id)" variant="warning">Edit</b-button>
            <b-button @click="change(false)" type="button" variant="primary">Cancel</b-button>

            </b-form>

        </b-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['dataEdit', 'pages'],
    data() {
        return {
            newData: {
                id: this.dataEdit._id,
                title: '',
                description: '',
                tags: ''
            },
            show: true
        }
    },
  methods: {
    change(value){
        this.show = false
        this.$router.push(`/mypost`)
    },
    onSubmit(id){
      console.log(this.newData)
      const data = {
          id: id,
          title: this.newData.title,
          description: this.newData.description
      }
      this.$store.dispatch('editQuestion', data)
      this.$router.push(`/mypost`)
    },
  }
}
</script>