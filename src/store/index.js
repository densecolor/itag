import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import * as actions from './actions'
import * as types from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      bgcolor: '#fff',
      columnNumber: 6,
      bgImage: '',
      activeTab: 1,
      tags: []
    }
  },
  mutations: {
    [types.SET_SETTINGS] (state, payload) {
      Object.assign(state.settings, payload)
    },
    [types.UPDATE_COLOR] (state, payload) {
      state.settings.bgcolor = payload.bgcolor
    },
    [types.UPDATE_COLUMN] (state, payload) {
      state.settings.columnNumber = payload
    },
    [types.UPDATE_PATTERN] (state, payload) {
      state.settings.bgImage = payload
    },
    [types.UPDATE_ACTIVE_TAB] (state, payload) {
      state.settings.activeTab = payload
    },
    [types.UPDATE_TAGS] (state, { type, tag, id }) {
      switch (type) {
        case 'add':
          state.settings.tags.push(tag)
          break
        case 'delete':
          var uid = (element) => element.id === id
          state.settings.tags.splice(state.settings.tags.findIndex(uid), 1)
          break
        default:
          break
      }
    }
  },
  actions,
  modules: {
  },
  plugins: [createPersistedState()]
})
