import * as types from './mutation-types'

const makeAction = type => {
  return ({ commit }, ...args) => commit(type, ...args)
}

export const setSettings = makeAction(types.SET_SETTINGS)
export const updateColor = makeAction(types.UPDATE_COLOR)
export const updateColumn = makeAction(types.UPDATE_COLUMN)
export const updatePattern = makeAction(types.UPDATE_PATTERN)
export const updateActiveTab = makeAction(types.UPDATE_ACTIVE_TAB)
export const updateTags = makeAction(types.UPDATE_TAGS)
