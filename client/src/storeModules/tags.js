const api = 'http://localhost:3000/api/'
import axios from 'axios'
export default {
  state : {
    tags : []
  },
  mutations : {
    STORETAGS (state, payload )  {
      state.tags = payload
    }
  },
  actions : {
    fetchTags ({ state, commit }, payload) {
      axios({
        method: 'GET',
        url: `${api}tags`
      })
      .then(({data}) => {
        commit('STORETAGS', data)
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  },
  getters : {

  }
}