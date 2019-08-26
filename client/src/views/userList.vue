<template>
  <div class="user-list">
    <b-container fluid>
      <b-row>
        <b-col cols="2" style="padding=0">
          <sidebar />
        </b-col>
        <b-col cols="8">
            <h3 style="margin-top : 40px;">Find someone in hacktivOverflow</h3>
            <p style="font-size:15px; text-align:justify;">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit voluptates saepe doloribus quaerat laborum, placeat minus tempore exercitationem delectus officiis praesentium aspernatur ullam? Doloribus totam dolorem, quaerat ad illum omnis.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, alias a obcaecati quod qui, voluptatem non veritatis tempora cum laboriosam incidunt ipsam laborum provident iste animi delectus soluta eveniet magnam!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias totam, culpa voluptates saepe beatae dolores cupiditate quidem aperiam, recusandae nobis quae cum aliquid quibusdam accusamus, quas earum exercitationem nisi libero!
            </p>
            <br/>
            <div class="card-grid">
                <listUser v-for="user in allUsers" :key="user._id" :user="user" class="user-card"/>
            </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import sidebar from '../components/sidebar.vue'
import listUser from '../components/listUser.vue'

export default {
  components: {
    sidebar,
    listUser
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getAllUser')
  },
  computed: {
    ...mapState(['allUsers'])
  }
}
</script>

<style>
.card-grid{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top : 10px;
    margin-right: 20px;
}
.user-card{
    width : 257px;
    height : 79px;
    border: 0.5px solid grey;
    margin-left: 20px;
}

</style>
