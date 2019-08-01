import Vue from 'vue'
import Vuex from 'vuex'
import ax from './axiosApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    answers: [],
    myquestions: [],
    onequestion: '',
    upvotes: '',
    downvotes: '',
    isLogin: false,
    isUser: null

  },
  mutations: {
    ISLOGIN(state, data) {
      state.isLogin = data
    },
    ISUSER(state, data) {
      state.isUser = data
    },
    QUESTIONLIST(state, payload) {        
      state.questions = payload
    },
    MYQUESTIONLIST(state, payload) {
      state.myquestions = payload
    },
    ANSWERLIST(state, payload) {
      state.answers = payload
    },
    NEWANSWER(state, payload) {
      state.answers.push(payload)
    },
    NEWQUESTION(state, payload) {
      state.questions.unshift(payload)
    },
    UPVOTES(state, payload) {
      state.upvotes = payload
    },
    DOWNVOTES(state, payload){
      state.downvotes = payload
    },
    ONEQUESTION(state, payload){
      state.onequestion = payload
    }
  },
  actions: {
    GETQUESTION(context) {
      ax.get('/questions/all').then(({ data }) => {
        
        context.commit('QUESTIONLIST', data)
      })
        .catch(err => {
          console.log(err)
        })
    },
    GETANSWER(context, id) {
      ax.get(`/answers/${id}`).then(({ data }) => {
        console.log(data);
        
        context.commit('ANSWERLIST', data)
      })
        .catch(err => {
          console.log(err)
        })
    },
    GETMYQUESTION(context) {
      ax.get('/questions/myquestion', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({ data }) => {
        console.log(data);
        context.commit('MYQUESTIONLIST', data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    GETONEQUESTION(context, id) {
     ax.get(`/questions/all?question=${id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(({ data }) => {
        context.commit('UPVOTES', data[0].upvotes.length)
        context.commit('DOWNVOTES', data[0].downvotes.length)
        context.commit('ONEQUESTION',data[0])
      })
      .catch(err => {
        console.log(err)
      })
    },
    CREATEQUESTION(context, payload) {
      return ax.post('/questions', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('NEWQUESTION', data)
          return true
        })
    },
    CREATEANSWER(context, payload) {
      return ax.post('/answers', payload, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('NEWANSWER', data)
          return true
        })
        .catch(err => {
          console.log(err)
        })
    },
    DELETEQUESTION(context,id){
      ax.delete(`/questions/${id}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.dispatch('GETQUESTION')
        context.dispatch('GETMYQUESTION')
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    EDITQUESTION(context,payload){
      return ax.put(`/questions/${payload.id}`,{
        title: payload.title,
        description: payload.desc,
        tags: payload.tags
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log('berhasil editq');
        context.dispatch('GETQUESTION')
        context.dispatch('GETONEQUESTION',payload.id)
        return true
      })
      .catch(err=>{
        console.log(err);
        
      })
    },
    EDITANSWER(context,payload){
      ax.put(`/answers/${payload.id}`,{
        description: payload.desc  
      },{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        console.log('berhasil edita');
        console.log(payload,'payloadnya');
        
        context.dispatch('GETANSWER',payload.qId)
      })
      .catch(err=>{
        console.log(err);
        
      })
    },

    DELETEANSWER(context,payload){
      return ax.delete(`/answers/${payload.id}`,{
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data})=>{
        context.dispatch('GETANSWER',payload.qId)
      })
    }
  }
})
