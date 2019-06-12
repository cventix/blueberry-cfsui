import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setLoadingState = actionBuilder(actionTypes.SET_LOADING_STATE, 'isLoading')
export const setModalLoadingState = actionBuilder(actionTypes.SET_MODAL_LOADING_STATE, 'modalLoading')
