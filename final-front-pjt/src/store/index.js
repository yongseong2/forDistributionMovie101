import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)
// const API_URL = 'http://127.0.0.1:8000'
const API_URL = 'http://movie101.site:8000'
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['token', 'loginedUserName']
    })

  ],
  state: {
    articleList: [],
    token: null,
    loginedUserName: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true: false
    }
  },
  mutations: {
    GET_ARTILCES(state, articles) {
      state.articleList = articles
    },
    SAVE_TOKEN(state, token) {
      state.token = token
      router.push({name:'MainView'})
    },
    DELETE_TOKEN(state, token) {
      state.token = token
      if (router.currentRoute.name !== 'MainView') {
        router.push({name:'MainView'})
        window.location.reload()
      }
      alert('로그아웃 되었습니다.')
      
    },
    SAVE_LOGINED(state, username) {
      state.loginedUserName = username
    },
    DELETE_USERNAME(state, username) {
      state.loginedUserName = username
    }
  },
  actions: {

    // community
    getArticles(context) {
      axios({
        method:'get',
        url: `${API_URL}/community/`
      })
      .then(res=>{
        context.commit('GET_ARTILCES', res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },

    //accounts
    signUp(context,payload){
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      context.commit('SAVE_LOGINED', username)

      axios({
        method:'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username, password1, password2
        }
      })
      .then(res=>{
        context.commit('SAVE_TOKEN', res.data.key)
      })
      .catch(err=>{
        console.log(err)
        if (err.response && err.response.status === 400 && err.response.data.username) {
          context.commit('DELETE_USERNAME', null)
          alert('중복된 아이디입니다.')
        } else {
          alert('오류가 발생했습니다.')
        }
      })

    },
    logIn(context, payload) {
      const username = payload.username
      const password = payload.password

      axios({
        method:'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
      .then(res=> {
        context.commit('SAVE_TOKEN', res.data.key)
        context.commit('SAVE_LOGINED', username)
        // context.commit('SAVE_USERNAME',)
      })
      .catch(err=>{
        console.log(err)
        alert('올바른 아이디 또는 비밀번호를 입력하세요')
      })
    },
    logOut(context) {
      // context.commit('SAVE_TOKEN', null)
      // router.push({name: 'LoginView'})
      // const username = payload.username
      // const password = payload.password
      axios({
        method:'post',
        url: `${API_URL}/accounts/logout/`,
      })
      .then(()=>{
        context.commit('DELETE_TOKEN', null)
        context.commit('DELETE_USERNAME', null)
      })
    }
    
  },
  modules: {
  }
})
