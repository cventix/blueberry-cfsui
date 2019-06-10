import { put } from 'redux-saga/effects'
import * as actions from '../actions'
import { AnyAction } from 'redux'
import { bottle } from '../../../index'

const documents = bottle.container.Documents
console.log
export function* getDocuments(action: AnyAction) {
  let folderInfo
  if (action.payload) folderInfo = { isChildren: action.payload.isChildren, path: action.payload.path, headers: action.payload.headers }
  console.log()
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getDocuments(folderInfo)
    if (folderInfo && folderInfo.isChildren === true) data = data.children
    yield put(actions.setDocuments(data))
    if (data.length < 1) yield put(actions.setParentId(action.payload.parentId))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* getModalDocuments(action: AnyAction) {
  let folderInfo
  if (action.payload) folderInfo = { isChildren: action.payload.isChildren, path: action.payload.path, headers: action.payload.headers }
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getDocuments(folderInfo)
    if (folderInfo && folderInfo.isChildren === true) data = data.children
    yield put(actions.setModalDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* getTrashDocuments() {
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getTrashDocuments()
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* getSharedDocuments() {
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getSharedDocuments()
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* removeFolder(action: AnyAction) {
  let folderInfo = { folderId: action.payload.folderId }
  try {
    yield put(actions.setLoadingState(true))
    let response = yield documents.removeFolder(folderInfo)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* createFolder(action: AnyAction) {
  let getFolderInfo
  let folderInfo = { name: action.payload.name, description: action.payload.description, parentId: action.payload.parentId }
  if (action.payload.parentId) getFolderInfo = { isChildren: true, path: action.payload.parentName }
  try {
    yield put(actions.setLoadingState(true))
    let response = yield documents.createFolder(folderInfo)
    let data = yield documents.getDocuments(getFolderInfo)
    if (getFolderInfo && getFolderInfo.isChildren == true) data = data.children
    yield put(actions.setDocuments(data))
    yield put(actions.setResponse(response))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* renameFolder(action: AnyAction) {
  let renameInfo = { name: action.payload.name, folderId: action.payload.folderId }
  try {
    yield put(actions.setLoadingState(true))
    yield documents.renameFolder(renameInfo)
    let response = yield documents.renameFolder(renameInfo)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* moveDocuments(action: any) {
  let moveInfo = { targetId: action.payload.targetId, documentIds: action.payload.documentIds }
  console.log(moveInfo)
  try {
    yield put(actions.setLoadingState(true))
    yield documents.moveDocuments(moveInfo)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* shareDocuments(action: AnyAction) {
  let shareInfo = { userEmails: action.userEmails, documentIds: action.documentIds }
  try {
    yield put(actions.setLoadingState(true))
    yield documents.shareDocuments(shareInfo)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* generateLink(action: AnyAction) {
  let uuid = { uuid: action.payload }
  try {
    let result = yield documents.generateDownloadLink(uuid)
    yield put(actions.setDownloadToken(result.token))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* downloadDirectory(action: AnyAction) {
  let info = { type: action.payload.downloadType, documentIds: action.payload.documentIds }
  try {
    yield documents.downloadDirectory(info)
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* restoreFiles(action: AnyAction) {
  try {
    yield documents.restoreFiles({ documentIds: action.payload.documentIds })
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
