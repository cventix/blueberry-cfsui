import { put } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'
import { formatDate } from '../../utils/formatDates'

const documents = bottle.container.Documents

export function* getDocuments(action: any) {
  let folderInfo
  if (action.payload) folderInfo = { isChildren: action.payload.isChildren, path: action.payload.path, headers: action.payload.headers }
  console.log()
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getDocuments(folderInfo)
    if (folderInfo && folderInfo.isChildren === true) data = data.children
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* getModalDocuments(action: any) {
  console.log('jo')
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
export function* getTrashDocuments(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getTrashDocuments()
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* getSharedDocuments(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getSharedDocuments()
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* removeFolder(action: any) {
  let folderInfo = { folderId: action.payload.folderId }
  try {
    yield put(actions.setLoadingState(true))
    let response = yield documents.removeFolder(folderInfo)

    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* createFolder(action: any) {
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

export function* renameFolder(action: any) {
  console.log(action)
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
  let moveInfo = { targetId: action.targetId, documentIds: action.documentIds }
  try {
    yield put(actions.setLoadingState(true))
    yield documents.moveDocuments(moveInfo)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* shareDocuments(action: any) {
  let shareInfo = { userEmails: action.userEmails, documentIds: action.documentIds }
  try {
    yield put(actions.setLoadingState(true))
    yield documents.shareDocuments(shareInfo)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* generateLink(action: any) {
  console.log(action.payload)
  let uuid = { uuid: action.payload }
  console.log(uuid)
  try {
    yield put(actions.setLoadingState(true))
    yield documents.generateDownloadLink(uuid)
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* downloadDirectory(action: any) {
  let info = { type: action.payload.downloadType, documentIds: action.payload.documentIds }

  try {
    yield documents.downloadDirectory(info)
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
export function* restoreFiles(action: any) {
  console.log(action)
  try {
    yield documents.restoreFiles({documentIds : action.payload.documentIds})
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}
