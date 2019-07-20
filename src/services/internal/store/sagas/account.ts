import { put, call } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'

const account = bottle.container.Account
//console.log(account)

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
   let result =  yield account.changePlan(action.id, action.additionalInfo, action.applyNow)
   if (result == 200) {
    yield put(actions.setMessage('یک صورتحساب جدید برای شما ایجاد شد. برای فعال کردن حساب ویژه ی خود لطفا به صفحه  صورتحساب  ها بروید و صورتحساب خود را پرداخت کنید.'))
  }

    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* changeProfile(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield account.changeProfile(action.payload)
    yield put(actions.setUserInfo(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* getInvoices(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield account.getInvoices()
    yield put(actions.setInvoices(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* getInvoice(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    let result = yield account.getInvoice(action.payload.id)
    yield put(actions.setInvoice(result))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}