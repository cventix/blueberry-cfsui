import { put } from 'redux-saga/effects'
import * as actions from '../actions'
import { AnyAction } from 'redux'
import { bottle } from '../../../index'

const documents = bottle.container.Documents

export function* getDocuments(action: AnyAction) {
  //console.log(localStorage.getItem('token'))
  let base = { headers: { token: localStorage.getItem('token'), Cookie: `token="${localStorage.getItem('token')}"` } }
  let folderInfo
  if (action.payload && action.payload.isChildren)
    folderInfo = {
      isChildren: action.payload.isChildren,
      path: action.payload.path,
      headers: { token: localStorage.getItem('token'), Cookie: `token="${localStorage.getItem('token')}"` }
    }

  try {
    yield put(actions.setLoadingState(true))
    //console.log(folderInfo)
    let data = yield documents.getDocuments(folderInfo ? folderInfo : base)
    if (folderInfo && folderInfo.isChildren === true) {
      yield put(actions.setParentId(data.parent.id))
      data = data.children
    }
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* getModalDocuments(action: AnyAction) {
  let folderInfo,
    lastChild = false
  if (action.payload) folderInfo = { isChildren: action.payload.isChildren, path: action.payload.path, headers: action.payload.headers }
  try {
    yield put(actions.setModalLoadingState(true))
    let data = yield documents.getDocuments(folderInfo)
    if (folderInfo && folderInfo.isChildren === true) {
      if (data.children.length < 1) {
        lastChild = true
        data = data.parent
      } else {
        if (data.children.every((each: any) => each.discriminator == 'F')) lastChild = true
        data = data.children
      }
    }
    yield put(actions.setLastChild(false))
    lastChild ? yield put(actions.setLastChild(lastChild)) : yield put(actions.setModalDocuments(data))
    yield put(actions.setModalLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setModalLoadingState(false))
  }
}
export function* getTrashDocuments() {
  try {
    yield put(actions.setLoadingState(true))
    let data = yield documents.getTrashDocuments()
    yield put(actions.setDocuments(data))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
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
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* removeFolder(action: AnyAction) {
  let folderInfo = { folderId: action.payload.folderId }
  try {
    yield put(actions.setLoadingState(true))
    let response = yield documents.removeFolder(folderInfo)
    yield put(actions.setSelections([]))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* deleteDocument(action: AnyAction) {
  let folderInfo = { documentIds: action.payload.folderId }
  try {
    yield documents.deleteDocument(folderInfo)
    yield put(actions.setSelections([]))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
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
    yield put(actions.setMessage('پوشه ایجاد شد'))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
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
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* moveDocuments(action: any) {
  let moveInfo = { targetId: action.payload.targetId, documentIds: action.payload.documentIds }

  try {
    yield put(actions.setLoadingState(true))
    yield documents.moveDocuments(moveInfo)
    window.location.pathname.split('nwfm/')[1]
      ? yield put(actions.getDocuments({ isChildren: true, path: window.location.pathname.split('nwfm/')[1] }))
      : yield put(actions.getDocuments())
    yield put(actions.setMessage('فایل جا به جا شد'))
    yield put(actions.setSelections([]))
    yield put(actions.setModalSelections([]))
    yield put(actions.getModalDocuments({ modal: true }))
    yield put(actions.setHistory([]))
    yield put(actions.setLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* shareDocuments(action: any) {
  let shareInfo = { userEmails: action.userEmails, documentIds: [action.documentIds] }
  //console.log(shareInfo)
  try {
    yield documents.shareDocuments(shareInfo)
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
  }
}

export function* generateLink(action: AnyAction) {
  let uuid = { uuid: action.payload }
  try {
    yield put(actions.setDownloadLoadingState(true))
    let result = yield documents.generateDownloadLink(uuid)
    yield put(actions.setDownloadToken(result.token))
    yield put(actions.setDownloadLoadingState(false))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setDownloadLoadingState(false))
  }
}
export function* addDescription(action: AnyAction) {
  try {
    let result = yield documents.addDescription({ id: action.payload.id, description: action.payload.description })
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
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
    yield put(actions.setSelections([]))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* uploadDocuments(action: AnyAction) {
  //console.log(action)
  try {
    yield documents.uploadDocument({ body: action.payload.file, fileSize: action.payload.fileSize, fileName: action.payload.fileName, pathId: 0 })
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
export function* urlUpload(action: any) {
  //console.log(action)
  try {
    yield documents.urlUpload({ path: action.payload.url, parentId: action.payload.url })
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* changeSharingStatus(action: any) {
  //console.log(action)
  try {
    let result = yield documents.changeSharingStatus({ id: action.payload.id, sharingStatus: action.payload.sharingStatus })
    actions.setSidebarItems(result)
    yield put(actions.setMessage('دسترسی تغییر داده شد.'))
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}

export function* uploadServer(action: any) {
  //console.log(action)
  try {
    yield documents.uploadServer({
      name: action.payload.name,
      size: action.payload.size,
      id: action.payload.id,
      uuid: action.payload.uuid,
      parent: action.payload.parent,
      mode: action.payload.mode,
      origin: action.payload.origin
    })
  } catch (err) {
    yield put(actions.setError(err.errors[0].msg))
    yield put(actions.setLoadingState(false))
  }
}
