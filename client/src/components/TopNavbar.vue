<template>
    <div id="container" class="d-flex justify-content-between align-items-center">
        <div>
			<router-link to="/" id="web-header-title">
				<span>
					stack<b>overload</b>
				</span>
			</router-link>
        </div>
        <div class="d-flex">
            <div class="d-flex">
                <button class="btn-navbar" v-b-modal="'modal-login'" v-if="!isLoggedIn">
                    log<b>in</b>
                </button>

                <button class="btn-navbar" v-b-modal="'modal-register'" v-if="!isLoggedIn">
                    sign<b>up</b>
                </button>
            </div>
            <login-modal></login-modal>
            <register-modal></register-modal>

            <div class="d-flex">
                <button class="btn-navbar" v-b-modal="'modal-new-question'" v-if="isLoggedIn">
                    ask<b>question</b>
                </button>

                <button class="btn-navbar" v-if="isLoggedIn">
                  	<router-link to="/dashboard" id="my-dashboard-nav">
                      my<b>dashboard</b>
                  	</router-link>
                </button>

                <button class="btn-navbar" v-b-modal="'modal-logout'" v-if="isLoggedIn">
                    log<b>out</b>
                </button>
            </div>
            <new-question-modal></new-question-modal>
            <confirmation-modal :detail="{id: 'logout', title: 'Logout', message: 'Are you sure to logout?'}" @execute="logout();"></confirmation-modal>

        </div>

    </div>
</template>

<script>

import RegisterModal from '@/components/RegisterModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import NewQuestionModal from '@/components/NewQuestionModal.vue';

export default {
  components: {
    RegisterModal,
    LoginModal,
    ConfirmationModal,
    NewQuestionModal,
  },
  data() {
    return {
      searchKey: '',
    };
  },
  methods: {
    logout() {
      this.$store.commit('logout');
      this.$router.push("/");
    },
    search() {
      this.$store.dispatch('search', this.searchKey);
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style scoped>
    #container{
      background-color: #0b0c10;
      color: #66fcf1;
      padding: 30px 50px;
		  height: 10vh;
    }
    #web-header-title{
      font-size: 20pt !important;
		  text-decoration: none !important;
		  color: #66fcf1;
    }
    .btn-navbar{
      background-color: #0b0c10;
      border: solid 2px #66fcf1;
      border-radius: 5px;
      color: #c5c6c8;
      margin: 10px;
      font-size: 16pt;
    }
    .btn-navbar:hover{
      background-color: #66fcf1;
      color: #0b0c10;
    }
	#search-container{
		margin: 0px 30px;
	}
	#search-bar{
		background-color: #c5c6c8;
		border-radius: 10px;
		height: 35px;
		border: solid 2px #66fcf1;
		padding: 10px;
	}
  #my-dashboard-nav{
    text-decoration: none !important;
    color: #c5c6c8;
  }
  #my-dashboard-nav:hover{
    color: #0b0c10
  }
</style>
