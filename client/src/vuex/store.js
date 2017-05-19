import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store ({
  state : {
    twitLine : [],
    mostTag : [],
    hasUser : ''
  },
  mutations : {
    getMutTwitt(state, twit){
      state.twitLine = twit
    },
    getUser(state, data){
      console.log('after check', data);
      state.hasUser = data
    }
  },
  actions : {
    checkToken({commit}, datatoken){
      console.log('token action', datatoken );
      let url = 'http://localhost:3000/users'
      axios.get(url,{
        headers : {token : datatoken}
      }).then((response) =>{
        console.log('ini masuk', response.data.username);
        commit('getUser', response.data.username)
      })
    },
    getTwitt({commit}){
      let url = 'http://localhost:3000'
      axios.get(url).then(response=>{
        commit('getMutTwitt', response.data)
      })
    },
    register({commit}, data){
      let url = 'http://localhost:3000/users/signup'
      axios.post(url,{
        username : data.username,
        password : data.password,
        email : data.email
      }).then(response=>{
        alert(response.data.status)
      })
    },
    login({commit}, data){
      console.log(data);
      let url = 'http://localhost:3000/users/signin'
      axios.post(url,{
        username : data.username,
        password : data.password
      }).then((response)=>{
        console.log(response.data.token, 'from actions');
        localStorage.setItem('token', response.data.token)
      })
    }
  }
})