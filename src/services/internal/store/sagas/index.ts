import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../actions/types'
import { login } from './auth'
// import { getUserInfo } from './user'

function* watchAuth() {
  yield takeEvery(actionTypes.LOGIN, login)
  //   yield takeEvery(actionTypes.REGISTER, register)
  //   yield takeEvery(actionTypes.FORGET_PASSWORD, forgetPassword)
  //   yield takeEvery(actionTypes.CHANGE_PASSWORD, resetPassword)
  //   yield takeEvery(actionTypes.VERIFY_MOBILE, verifyMobile)
  //   yield takeEvery(actionTypes.LOGOUT, logout)
  //   yield takeEvery(actionTypes.GET_USER_INFO, getUserInfo)
}

export function* rootSaga() {
  yield all([watchAuth()])
}
