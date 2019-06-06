import Vue from 'vue'
import Vuex from 'vuex'
import Menu from '@/data/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: Menu
  },
  mutations: {
    setToken () {

    }
  },
  actions: {

  },
  modules: {

  }
})
