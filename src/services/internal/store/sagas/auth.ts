import { put, call } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'
// @ts-ignore
const auth = bottle.service.Auth
// @ts-ignore
const storage = bottle.service.Storage

export function* login(action: any) {
  try {
    yield put(actions.setUserCredentials({ token: action.payload.token }))
    yield put(actions.setLoadingState(true))
    const response = yield auth.login(action.payload.email, action.payload.password)
    console.log('resp', response)
    yield put(actions.setLoadingState(false))
    yield put(actions.setToken(response.token))
    yield storage.setItem('token', response.token)
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
