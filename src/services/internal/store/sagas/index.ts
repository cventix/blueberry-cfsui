import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../actions/types'
import { login } from './auth'
import { getDocuments, createFolder, renameFolder, moveDocuments , shareDocuments,} from './documents'


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
function* watchDocuments() {
  yield takeEvery(actionTypes.GET_DOCUMENTS, getDocuments)
  yield takeEvery(actionTypes.CREATE_FOLDER, createFolder)
  yield takeEvery(actionTypes.RENAME_FOLDER, renameFolder)
  yield takeEvery(actionTypes.SHARE_DOCUMENTS, shareDocuments)
  yield takeEvery(actionTypes.MOVE_DOCUMENTS, moveDocuments)
}

export function* rootSaga() {
  yield all([watchAuth(), watchDocuments()])
}
