import { put } from 'redux-saga/effects'
import * as actions from '../actions'

import { bottle } from '../../../index'
import { formatDate } from '../../utils/formatDates'

const documents = bottle.container.Documents

export function* getDocuments(action: any) {
  try {
    yield put(actions.setLoadingState(true))
    const data = yield documents.getDocuments()
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setLoadingState(false))
  }
}

export function* createFolder(action: any) {
  let folderInfo = { name: action.payload.name, description: action.payload.description, parentId: action.payload.parentId }
  console.log(action)
  try {
    yield put(actions.setLoadingState(true))
    let response = yield documents.createFolder(folderInfo)
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
    yield put(actions.setResponse(response))
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
