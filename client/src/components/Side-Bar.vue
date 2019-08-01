<template>
  <div class="side-nav">
    <b-menu>
      <b-menu-list label="User">
        <h1>Hello, <br>{{loggedUser.fullname}}</h1>
      </b-menu-list>
      <b-menu-list label="Menu">
        <router-link to="/">
          <b-menu-item icon="information-outline" label="{ Kodeposit }" has-link="true"></b-menu-item>
        </router-link>

        <b-menu-item v-if="isLogin" icon="settings">
          <template slot="label" slot-scope="props">
              My Profile
              <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-up'">
              </b-icon>
          </template>
          <router-link
            to="/my-question">
            <b-menu-item icon="account" label="My Question" has-link="true"></b-menu-item>
          </router-link>
          <router-link
            to="/my-answer">
            <b-menu-item icon="cellphone-link" label="My Answer" has-link="true"></b-menu-item>
          </router-link>
        </b-menu-item>
      </b-menu-list>
      <b-menu-list label="Jobs">
        <div class="box" style="margin-top: 2.5vh;">
          <h1 style="font-weight: 600; font-size: 0.75em">Bored of Your Job ?</h1>
          <div v-for="ad in ads" :key="ad._id" class="job-box">
            <div class="ads-pic">
              <img :src="ad.company_logo" :alt="ad.company_">
            </div>
            <div class="ads-text">
              <h1>{{ad.company}}</h1>
              <p>{{ad.title}}</p>
              <small>{{ad.location}} - <strong>{{ad.type}}</strong></small>
            </div>
            <div class="btn-go" style="display: flex; justify-content: center">
              <b-button 
                type="is-primary"
                rounded
                style="font-weight:600"
              >Visit</b-button>
            </div>
          </div>
        </div>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: mapState({
    ads: state => state.ads,
    isLogin: state => state.isLogin,
    loggedUser: state => state.loggedUser
  })
}
</script>


<style scoped>
  .job-box {
    margin: 1.5vh 0;
    padding: 0.75rem;
    background-color: #fff;
    border: solid 1px #efefef;
    border-radius: 5px;
  }

  .ads-text {
    text-align: start;
    padding: 1em;
    padding-bottom: 5.5vh;
  }

  .ads-text h1 {
    font-size: 0.95em;
    font-weight: 600;
  }

  .ads-text p {
    margin-top: 0.5em;
  }

  .ads-pic {
    padding: 0.25em 1em
  }

  .ads-pic img {
    max-height: 50px;
    width: auto;
  }
</style>
