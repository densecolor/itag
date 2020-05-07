import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      bgcolor: '#fff',
      columnNumber: 6,
      bgImage: '',
      activeTab: 1
    }
  },
  mutations: {
    updateColor (state, payload) {
      state.settings.bgcolor = payload
    },
    updateColumn (state, payload) {
      state.settings.columnNumber = payload
    },
    updatePattern (state, payload) {
      state.settings.bgImage = payload
    },
    updateActiveTab (state, payload) {
      state.settings.activeTab = payload
    }
  },
  actions: {
    updateColor ({ commit }, payload) {
      commit('updateColor', payload.bgcolor)
    },
    updateColumn ({ commit }, payload) {
      commit('updateColumn', payload.columnNumber)
    },
    updatePattern ({ commit }, payload) {
      commit('updatePattern', payload.bgImage)
    },
    updateActiveTab ({ commit }, payload) {
      commit('updateActiveTab', payload.activeTab)
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
