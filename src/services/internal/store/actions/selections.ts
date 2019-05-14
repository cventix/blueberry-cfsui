import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setSelections = actionBuilder(actionTypes.SET_SELECTIONS, 'payload')
