import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const getDocuments = actionBuilder(actionTypes.GET_DOCUMENTS, 'payload')
export const getModalDocuments = actionBuilder(actionTypes.GET_MODAL_DOCUMENTS, 'payload')
export const getTrashDocuments = actionBuilder(actionTypes.GET_TRASH_DOCUMENTS)
export const getSharedDocuments = actionBuilder(actionTypes.GET_SHARED_DOCUMENTS)
export const createFolder = actionBuilder(actionTypes.CREATE_FOLDER, 'payload')
export const renameFolder = actionBuilder(actionTypes.RENAME_FOLDER, 'payload')
export const removeFolder = actionBuilder(actionTypes.REMOVE_FOLDER, 'payload')
export const moveDocuments = actionBuilder(actionTypes.MOVE_DOCUMENTS)
export const shareDocuments = actionBuilder(actionTypes.SHARE_DOCUMENTS)
export const setDocuments = actionBuilder(actionTypes.SET_DOCUMENTS, 'payload')
export const setTempDocuments = actionBuilder(actionTypes.SET_TEMP_DOCUMENTS, 'payload')
export const setResponse = actionBuilder(actionTypes.SET_RESPONSE, 'payload')
export const setModalDocuments = actionBuilder(actionTypes.SET_MODAL_DOCUMENTS, 'payload')
export const generateDownloadLink = actionBuilder(actionTypes.GENERATE_DOWNLOAD_LINK, 'payload')
export const downloadDirectory = actionBuilder(actionTypes.DOWNLOAD_DIRECTORY, 'payload')
export const restoreFiles = actionBuilder(actionTypes.RESTORE_FILES, 'payload')
