import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const setSidebarItems = actionBuilder(actionTypes.SET_SIDEBAR_ITEM, 'payload')
export const setPreviewImage = actionBuilder(actionTypes.SET_PREVIEW_IMAGE, 'payload')
