import Vue from 'vue'
import Vuex from 'vuex'
import axi from '@/axios.js'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    logedUser: {},
    allQuestion: [],
    detailQuestion: {},
    searchbytagresult: [],
    allTags: []
  },
  mutations: {
    checkLocal(state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true
      } else {
        state.isLogin = false
      }
    },
    changeLogin(state, token) {
      if (state.isLogin) {
        state.isLogin = false
      }else {
        state.isLogin = true
        router.push('/home')
        localStorage.setItem('token', token)
      }
    },
    whoami(state, mydata) {
      console.log(mydata)
      state.logedUser = mydata
    },
    fetchQuestion(state, questionData) {
      // console.log(questionData)
      state.allQuestion = questionData
    },
    getQuestion(state, question) {
      state.detailQuestion = question
    },
    postAnswer(state, createdanswer) {},
    searchbytag(state, tagresult) {
      console.log(tagresult, 'ini udah omer ke mutation')
      state.searchbytagresult = tagresult
    },
    getTags(state, tags) {
      state.allTags = tags
    }
  },
  actions: {
    login({commit,dispatch}, loginData) {
      loginData.ue = loginData.email
      // console.log(loginData,'--==== from store')
      axi({
        url: `users/signin`,
        method: 'POST',
        data: loginData
      })
        .then(({data}) => {
          // console.log(data,' berhasil masuk')
          commit('changeLogin', data.token)
          dispatch('whoami')
        }).catch(err => console.log(err))
    },
    register({commit}, registerData) {
      // console.log(registerData,'--==== from store')
      axi({
        url: `users/signup`,
        method: 'POST',
        data: registerData
      })
        .then(({data}) => {
          // console.log(data)
          return axi({
            url: `users/signin`,
            method: 'POST',
            data: {
              ue: data.email,
              password: registerData.password
            }
          })
        })
        .then(({data}) => {
          // console.log(data,'berhasil masuk')
          commit('changeLogin', data.token)
          dispatch('whoami')
        }).catch(err => console.log(err))
    },
    whoami({commit}, userInfo) {
      // console.log('mengecek user')
      axi({
        url: `/users/logedUser`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          // console.log(data,'data whoami')
          commit('whoami', data)
        }).catch(err => console.log(err))
    },
    fetchQuestion({commit}) {
      axi({
        url: `/questions`,
        method: `GET`
      })
        .then(({data}) => {
          console.log(data, 'all quesitons')
          commit('fetchQuestion', data.reverse())
        }).catch(err => console.log(err))
    },
    getQuestion({commit}, id) {
      axi({
        url: `/questions/${id}`,
        method: 'GET'
      })
        .then(({data}) => {
          console.log(data)
          commit('getQuestion', data)
        }).catch(err => console.log(err))
    },
    postAnswer({commit, dispatch},answerdata) {
      axi({
        url: `/answers/${answerdata.questionId}`,
        method: 'POST',
        data: {
          answer: answerdata.body
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          dispatch('getQuestion', answerdata.questionId)
        }).catch(err => console.log(err))
    },
    postQuestion({commit, dispatch},questionData) {
      console.log(questionData, 'post data sampe store')
      axi({
        url: `/questions`,
        method: 'POST',
        data: questionData,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, ' berhasil bikin quesiton baru')
          dispatch('fetchQuestion')
        }).catch(err => console.log(err))
    },
    gettitlesearch({commit}, searchtitle) {
      console.log(searchtitle, 'ini dearch bar di store')
    },
    searchbytag({commit}, tag) {
      // console.log(tag, 'ini tag yang dicari tapi dis tore')
      axi({
        url: `/questions/tag?tag=${tag}`,
        method: `GET`
      })
        .then(({data}) => {
          // console.log(data,'ini hasil searchby tag')
          commit('searchbytag', data)
        }).catch(err => console.log(err))
    },
    editquestion({commit}, questiondata) {
      console.log(questiondata, ' di dalam store')
      axi({
        url: `/questions/${questiondata.questionId}`,
        method: `PATCH`,
        data: {
          title: questiondata.title,
          content: questiondata.content,
          tags: questiondata.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
          this.dispatch('getQuestion', questiondata.questionId)
        }).catch(err => console.log(err))
    },
    deletequestion({commit}, questionid) {
      console.log(questionid, ' di dalam store')
      axi({
        url: `questions/${questionid}`,
        method: `DELETE`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, 'berhasil delete')
          router.push('/home')
        }).catch(err => console.log(err))
    },
    getTags({commit}) {
      console.log('di sini di store')
      axi({
        url: `/tags`,
        method: 'GET'
      })
        .then(({data}) => {
          // console.log(data,'ini semua tag yang ada di database')
          // commit('getTags',data)
          let tagname = []
          data.forEach(element => {
            tagname.push(element.tagname)
          })
          tagname = [...new Set(tagname)]
          console.log(tagname)
          commit('getTags', tagname)
        }).catch(err => console.log(err))
    },
    newtag({dispatch}, tags) {
      console.log(tags, 'from store')
      axi({
        url: `/users/newWatch`,
        method: 'PATCH',
        data: {
        tags},
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log('berhasil update watched ini datanya', data)
          dispatch('whoami')
          dispatch('getTags')
        }).catch(err => console.log(err))
    },
    deletetag({state, dispatch},tagname) {
      console.log(tagname, '-------======== ini tagname')
      axi({
        url: `/users/removeWatchtag`,
        method: 'PATCH',
        data: {
          userId: state.logedUser._id,
          tagname: tagname
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, 'ini data habis remove')
          dispatch('whoami')
        }).catch(err => console.log(err))
    },
    voteQuestion({dispatch, commit},questionData) {
      let voteUrl

      if (questionData.vote === 'up') {
        voteUrl = `/questions/up/${questionData.questionId}`
      } else if (questionData.vote === 'down') {
        voteUrl = `/questions/down/${questionData.questionId}`
      }
      console.log(voteUrl, 'ini vote url')
      axi({
        url: voteUrl,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data, 'berhasil mengubah')
          dispatch('whoami')
          dispatch('getQuestion', questionData.questionId)
        }).catch(err => console.log(err))
    },
    answerVote({dispatch,commit}, answerData) {
      // console.log(id , 'ke upvote daro store')
      let voteUrl
      if(answerData.vote === 'up'){
        voteUrl = `/answers/up/${answerData.answerId}`
      }else if(answerData.vote === 'down'){
        voteUrl = `/answers/down/${answerData.answerId}`
      }

      axi({
        url: voteUrl,
        method: 'PATCH',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=> {
        console.log(data,'berhasil merubah answer vote')
        dispatch('whoami')
        dispatch('getQuestion',data.questionId)
      }) .catch(err => console.log(err))
    }
  }
})
