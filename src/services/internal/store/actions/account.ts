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

export const setCities = actionBuilder(actionTypes.SET_CITIES, 'payload')

export const getInvoices = actionBuilder(actionTypes.GET_INVOICES, 'payload')

export const setInvoices = actionBuilder(actionTypes.SET_INVOICES, 'payload')

export const getInvoice = actionBuilder(actionTypes.GET_INVOICE, 'payload')

export const setInvoice = actionBuilder(actionTypes.SET_INVOICE, 'payload')

export const addToBalance = actionBuilder(actionTypes.ADD_TO_BALANCE, 'payload')
