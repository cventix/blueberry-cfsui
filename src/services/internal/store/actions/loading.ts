import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setLoadingState = actionBuilder(actionTypes.SET_LOADING_STATE, 'isLoading')
