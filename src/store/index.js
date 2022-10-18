import Vue from 'vue'
import Vuex from 'vuex'

import { api } from '@/services.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    login: false,
    user:{
      id: "",
      nome: "",
      email: "",
      senha: "",
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidate: "",
      estado: ""
    },
    userProducts: null
  },
  getters: {},
  mutations: {
    UPDATE_LOGIN(state, payload){
      state.login = payload
    },
    UPDATE_USER(state, payload){
      state.user = Object.assign(state.user, payload)
    },
    UPDATE_USER_PRODUCTS(state, payload){
      state.userProducts = payload
    },
    ADD_USER_PRODUCTS(state, payload){
      state.userProducts.unshift(payload)
    }
  },
  actions: {
    getUserProducts(context){
      api.get(`produto?usuario_id=${context.state.user.id}`)
        .then(response => {
          context.commit("UPDATE_USER_PRODUCTS", response.data)
        })
    },
    getUser(context){
      return api.get(`/usuario`)
        .then(response => {
          context.commit("UPDATE_USER", response.data)
          context.commit("UPDATE_LOGIN", true)
        })
    },

    createUser(context, payload){
      context.commit("UPDATE_USER", { id: payload.email })
      return api.post("/usuario", payload)
    },

    logarUsuario(context, payload){
      return api.login({
        username: payload.email,
        password: payload.password
      })
      .then(response => {
        window.localStorage.token = `Bearer ${response.data.token}`
      })
    },

    deslogarUsuario(context){
      context.commit("UDPATE_USER", {
        id: "",
        nome: "",
        email: "",
        senha: "",
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        cidate: "",
        estado: ""
      })
      context.commit("UPDATE_lOGIN",false)

      window.localStorage.removeItem("token")
    }
  },
  modules: {}
})
