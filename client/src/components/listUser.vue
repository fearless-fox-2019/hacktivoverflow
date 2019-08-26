<template>
  <div class="user-list">
    <div id="user-detail">
      <b-row>
        <b-col cols="3">
             <img
              src="https://storage.googleapis.com/mini-wpstorage-friska/1563714564898nopic_192.gif"
              alt="profile-picture"
              width="50px"
              style="margin-left:10px; margin-top:10px;"
            />
        </b-col>
        <b-col cols="9">
          <router-link to='#'> <h4>{{user.firstname}} {{user.lastname}}</h4> </router-link>
          <span>{{user.birthday.substring(0,10)}}</span>
          <p>{{user.email}}</p>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['user'],
  data () {
    return {}
  }
}
</script>

<style scoped>
#user-detail {
  font-size: 12px;
}
</style>
