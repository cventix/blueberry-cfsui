import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setSidebarItems = actionBuilder(actionTypes.SET_SIDEBAR_ITEM, 'payload')
export const setPreviewImage = actionBuilder(actionTypes.SET_PREVIEW_IMAGE, 'payload')
export const setDownloadToken = actionBuilder(actionTypes.SET_DOWNLOAD_TOKEN, 'payload')
export const setEditStatus = actionBuilder(actionTypes.SET_EDIT_STATUS, 'payload')
export const setRenameText = actionBuilder(actionTypes.UPDATE_RENAME_TEXT, 'payload')


