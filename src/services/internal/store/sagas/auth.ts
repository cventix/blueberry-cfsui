import { put, call } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'
import { AnyAction } from 'redux'

const auth = bottle.container.Auth
const storage = bottle.container.Storage

export function* login(action: AnyAction) {
  try {
    yield put(actions.setLoadingState(true))
    const { token, user } = yield auth.login(action.payload.email, action.payload.password)
    yield put(actions.setToken({ token }))
    yield put(actions.setUserCredentials({ username: user.username }))
    yield storage.setItem('user', user.username)
    yield localStorage.setItem('token', token)
    document.cookie = `token="${token}"`;
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* forgetPassword(action: AnyAction) {
  try {
    yield put(actions.setLoadingState(true))
    const result = yield auth.forgetPassword(action.email.email)
    //console.log(result)
    if (result == 200) {
      yield put(actions.setMessage('لینک بازیابی کلمه عبور به ایمیل شما فرستاده شد'))
    }
    yield put(actions.setLoadingState(false))
  } catch (err) {
    //console.log(err)
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* register(action: AnyAction) {
  //console.log(action)
  try {
    yield put(actions.setLoadingState(true))
    yield auth.register(action.email, action.username, action.password,action.reCaptcha)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    //console.log(err)
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* signout() {
  try {
    yield auth.signout()
    yield put(actions.setUserCredentials({ username: '' }))
    yield storage.removeItem('token')
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
  location.reload()
}

export function* getUserInfo() {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield auth.getUserInfo()
    yield put(actions.setUserInfo(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }

}
export function* changePassword(action: AnyAction) {
  try {
    yield put(actions.setLoadingState(true))
    yield auth.changePassword(action.currentPassword, action.newPassword)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }

}
export function* getProducts() {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield auth.getProducts()
    yield put(actions.setProducts(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }

}