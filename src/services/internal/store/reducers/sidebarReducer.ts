import { actionTypes } from '../actions/types'
import { t } from 'ttag';

export interface PayloadInterface {
  data?: object[]
}
export interface StateInterface {
  item?: any
  image?: string
  downloadToken?: string
  isEditable?: number
  renameText?: string
  profileTab?: String
}
export const initialState: StateInterface = {
  item: [],
  image: 'medium',
  downloadToken: '',
  isEditable: 0,
  renameText: '',
  profileTab: t`پلن`
}

const selectReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SIDEBAR_ITEM:
      return {
        ...state,
        item: action.payload
      }
    case actionTypes.SET_PREVIEW_IMAGE:
      return {
        ...state,
        image: action.payload
      }
    case actionTypes.SET_DOWNLOAD_TOKEN:
      return {
        ...state,
        downloadToken: action.payload
      }
    case actionTypes.SET_EDIT_STATUS:
      return {
        ...state,
        isEditable: action.payload
      }
    case actionTypes.UPDATE_RENAME_TEXT:
      return {
        ...state,
        renameText: action.payload
      }
    case actionTypes.SET_PROFILE_TAB:
      return {
        ...state,
        profileTab: action.payload
      }
    default:
      return state
  }
}

export default selectReducer
