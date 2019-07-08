import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const getUserInfo = actionBuilder(actionTypes.GET_USER_INFO)

export const setUserInfo = actionBuilder(actionTypes.SET_USER_INFO, 'info')

export const getProducts = actionBuilder(actionTypes.GET_PRODUCTS)

export const setProducts = actionBuilder(actionTypes.SET_PRODUCTS, 'products')

export const setFormState = actionBuilder(actionTypes.SET_FORM_STATE, 'payload')

export const setProductToggle = actionBuilder(actionTypes.SET_PRODUCT_TOGGLE, 'payload')

export const changePlan = actionBuilder(actionTypes.CHANGE_PLAN, 'id', 'additionalInfo', 'applyNow')

export const changeProfile = actionBuilder(actionTypes.CHANGE_PROFILE, 'payload')
