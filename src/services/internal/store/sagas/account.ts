import { put, call } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'

const account = bottle.container.Account
console.log(account)

export function* getUserInfo() {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield account.getUserInfo()
    yield put(actions.setUserInfo(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* getProducts() {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield account.getProducts()
    yield put(actions.setProducts(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* changePlan(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    yield account.changePlan(action.id, action.additionalInfo, action.applyNow)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
