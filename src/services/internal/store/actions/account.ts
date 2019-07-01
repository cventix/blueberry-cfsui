import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setFormState = actionBuilder(actionTypes.SET_FORM_STATE, 'payload')
export const setProductToggle = actionBuilder(actionTypes.SET_PRODUCT_TOGGLE, 'payload')