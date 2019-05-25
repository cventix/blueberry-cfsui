import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'


export const setHistory = actionBuilder(actionTypes.SET_HISTORY, 'payload')
