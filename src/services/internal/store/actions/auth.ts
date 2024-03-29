import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setUserCredentials = actionBuilder(actionTypes.SET_USER_CREDENTIALS, 'payload')

export const login = actionBuilder(actionTypes.INIT_LOGIN, 'payload')

export const setToken = actionBuilder(actionTypes.SET_TOKEN, 'payload')

export const register = actionBuilder(actionTypes.REGISTER, 'email', 'username', 'password', 'reCaptcha')

export const signout = actionBuilder(actionTypes.SIGNOUT)


export const forgetPassword = actionBuilder(actionTypes.FORGET_PASSWORD, 'email')

export const changePassword = actionBuilder(actionTypes.CHANGE_PASSWORD, 'currentPassword', 'newPassword')

// export const verifyMobile = actionBuilder(actionTypes.VERIFY_MOBILE, 'mobile', 'password', 'verifyCode')

// export const resetPassword = actionBuilder(actionTypes.RESET_PASSWORD, 'mobile')

// export const changeAuthFormState = actionBuilder(actionTypes.CHANGE_AUTH_FORM_STATE, 'authFormState')

// export const setCity = actionBuilder(actionTypes.SET_CITY, 'city')

// export const logout = actionBuilder(actionTypes.LOGOUT)
