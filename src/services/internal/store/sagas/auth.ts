import { put } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'

const auth = bottle.container.Auth
const storage = bottle.container.Storage

export function* login(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    const { token, user } = yield auth.login(action.payload.email, action.payload.password)
    yield put(actions.setLoadingState(false))
    yield put(actions.setToken({ token }))
    yield put(actions.setUserCredentials({ username: user.username }))
    yield storage.setItem('token', token)
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
