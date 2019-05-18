import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../actions/types'
import { login, register, signout } from './auth'
import { getDocuments, createFolder, renameFolder, moveDocuments, shareDocuments, removeFolder, getTrashDocuments } from './documents'
import { getSharedDocuments } from '../actions/documents';

// import { getUserInfo } from './user'

function* watchAuth() {
  yield takeEvery(actionTypes.INIT_LOGIN, login)
  yield takeEvery(actionTypes.REGISTER, register)
  yield takeEvery(actionTypes.SIGNOUT, signout)
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
  yield takeEvery(actionTypes.REMOVE_FOLDER, removeFolder)
  yield takeEvery(actionTypes.SHARE_DOCUMENTS, shareDocuments)
  yield takeEvery(actionTypes.MOVE_DOCUMENTS, moveDocuments)
  yield takeEvery(actionTypes.GET_TRASH_DOCUMENTS, getTrashDocuments)
  yield takeEvery(actionTypes.GET_SHARED_DOCUMENTS, getSharedDocuments)
}

export function* rootSaga() {
  yield all([watchAuth(), watchDocuments()])
}
