import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setSelections = actionBuilder(actionTypes.SET_SELECTIONS, 'payload')
export const setToggle = actionBuilder(actionTypes.SET_TOGGLE, 'payload')
