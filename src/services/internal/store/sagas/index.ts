import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import { actionTypes } from '../actions/types'
import { login, register, signout, forgetPassword, changePassword, } from './auth'
import {
  getDocuments,
  getSharedDocuments,
  generateLink,
  downloadDirectory,
  createFolder,
  renameFolder,
  moveDocuments,
  shareDocuments,
  removeFolder,
  getTrashDocuments,
  getModalDocuments,
  restoreFiles,
  deleteDocument,
  uploadDocuments,
  changeSharingStatus,
  urlUpload,
  uploadServer
} from './documents'
import { getProducts, getUserInfo, changePlan, changeProfile } from './account';


// import { getUserInfo } from './user'

function* watchAuth() {
  yield takeEvery(actionTypes.INIT_LOGIN, login)
  yield takeEvery(actionTypes.REGISTER, register)
  yield takeEvery(actionTypes.SIGNOUT, signout)
  yield takeEvery(actionTypes.FORGET_PASSWORD, forgetPassword)
  yield takeEvery(actionTypes.CHANGE_PASSWORD, changePassword)

  //   yield takeEvery(actionTypes.VERIFY_MOBILE, verifyMobile)
  //   yield takeEvery(actionTypes.LOGOUT, logout)
  //   yield takeEvery(actionTypes.GET_USER_INFO, getUserInfo)
}
function* watchUser() {
  yield takeEvery(actionTypes.GET_PRODUCTS, getProducts)
  yield takeEvery(actionTypes.GET_USER_INFO, getUserInfo)
  yield takeEvery(actionTypes.CHANGE_PLAN, changePlan)
  yield takeEvery(actionTypes.CHANGE_PROFILE, changeProfile)
}
function* watchDocuments() {
  yield takeEvery(actionTypes.GET_DOCUMENTS, getDocuments)
  yield takeEvery(actionTypes.GET_MODAL_DOCUMENTS, getModalDocuments)
  yield takeEvery(actionTypes.URL_UPLOAD, urlUpload)
  yield takeEvery(actionTypes.CREATE_FOLDER, createFolder)
  yield takeEvery(actionTypes.RENAME_FOLDER, renameFolder)
  yield takeLatest(actionTypes.REMOVE_FOLDER, removeFolder)
  yield takeLatest(actionTypes.SHARE_DOCUMENTS, shareDocuments)
  yield takeEvery(actionTypes.MOVE_DOCUMENTS, moveDocuments)
  yield takeEvery(actionTypes.GET_TRASH_DOCUMENTS, getTrashDocuments)
  yield takeEvery(actionTypes.GET_SHARED_DOCUMENTS, getSharedDocuments)
  yield takeEvery(actionTypes.GENERATE_DOWNLOAD_LINK, generateLink)
  yield takeEvery(actionTypes.UPLOAD_SERVER, uploadServer)
  
  yield takeEvery(actionTypes.RESTORE_FILES, restoreFiles)
  yield takeEvery(actionTypes.DELETE_DOCUMENT, deleteDocument)
  yield takeLatest(actionTypes.DOWNLOAD_DIRECTORY, downloadDirectory)
  yield takeEvery(actionTypes.UPLOAD_DOCUMENT, uploadDocuments)
  yield takeEvery(actionTypes.CHANGE_SHARING_STATUS, changeSharingStatus)
}

export function* rootSaga() {
  yield all([watchAuth(), watchDocuments(), watchUser()])
}
