import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setSelections = actionBuilder(actionTypes.SET_SELECTIONS, 'payload')
export const setModalSelections = actionBuilder(actionTypes.SET_MODAL_SELECTIONS, 'payload')
export const setToggle = actionBuilder(actionTypes.SET_TOGGLE, 'payload')
export const setFullScreen = actionBuilder(actionTypes.SET_TOGGLE, 'payload')
export const removeSelection = actionBuilder(actionTypes.REMOVE_SELECTION)
export const selectAll = actionBuilder(actionTypes.SELECT_ALL, 'payload')


