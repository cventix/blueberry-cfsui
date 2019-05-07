import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const getDocuments = actionBuilder(actionTypes.GET_DOCUMENTS,'payload')
export const createFolder = actionBuilder(actionTypes.CREATE_FOLDER, 'payload')
export const renameFolder = actionBuilder(actionTypes.RENAME_FOLDER, 'payload')
export const removeFolder = actionBuilder(actionTypes.REMOVE_FOLDER, 'payload')
export const moveDocuments = actionBuilder(actionTypes.MOVE_DOCUMENTS)
export const shareDocuments = actionBuilder(actionTypes.SHARE_DOCUMENTS)
export const setDocuments = actionBuilder(actionTypes.SET_DOCUMENTS, 'payload')
export const setResponse = actionBuilder(actionTypes.SET_RESPONSE, 'payload')
