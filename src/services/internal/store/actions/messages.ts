import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setError = actionBuilder(actionTypes.SET_ERROR, 'payload')
export const setMessage = actionBuilder(actionTypes.SET_MESSAGES, 'payload')
export const removeMessages =  actionBuilder(actionTypes.REMOVE_MESSAGES)
