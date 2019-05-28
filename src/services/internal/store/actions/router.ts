import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setRouter= actionBuilder(actionTypes.SET_ROUTER, 'payload')
