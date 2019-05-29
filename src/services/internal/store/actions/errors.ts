import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setError = actionBuilder(actionTypes.SET_ERROR, 'payload')