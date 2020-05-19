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
    },
    activeTag: {
      id: '',
      url: '',
      img: '',
      name: '',
      clickTime: 0
    }
  },
  mutations: {
    [types.SET_SETTINGS] (state, payload) {
      Object.assign(state.settings, payload)
    },
    [types.UPDATE_COLOR] (state, payload) {
      state.settings.bgcolor = payload
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
    [types.UPDATE_TAGS] (state, { type, tag, index }) {
      switch (type) {
        case 'add':
          state.settings.tags.push(tag)
          break
        case 'delete':
          state.settings.tags.splice(index, 1)
          break
        case 'modify':
          state.settings.tags.splice(index, 1, tag)
          break
        case 'addTimes':
          state.settings.tags[index].clickTime += 1
          break
        default:
          break
      }
    },
    [types.SET_ACTIVE_TAG] (state, payload = {
      id: '',
      url: '',
      img: '',
      name: ''
    }) {
      state.activeTag = payload
    }
  },
  actions,
  modules: {
  },
  plugins: [createPersistedState()]
})
