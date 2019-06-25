import { actionTypes } from '../actions/types'

export interface StateInterface {
  documents?: ItemInterface[]
  tem_doucuments: any[]
  modal_documents?: any[]
  value?: any[]
  response?: any[]
}

export interface ItemInterface {
  boost?: object
  cfsFullPath?: string
  createdAt?: number
  deleted?: boolean
  discriminator?: string
  docLocations?: any
  downloadCount?: number
  favourite?: boolean
  fullPath?: string
  genericType?: string
  hasPassword?: boolean
  id?: number
  name?: string
  owner: { displayName: string; id: number; md5: string }
  preview?: boolean
  purchased?: boolean
  shared?: boolean
  sharingStatus: string
  subdomain?: boolean
  treePath?: number
  updatedAt?: number
  uuid?: string
  mimeType?: string
  properties?: string
  size?: number
  
}

export interface PayloadInterface {
  documents?: ItemInterface[]
  tem_doucuments: any[]
  modal_documents?: any[]
  value?: any[]
  response?: any[]
}

export interface ActionInterface {
  type: string
  payload: PayloadInterface
}

export const initialState: any = {
  documents: [],
  tem_doucuments: [],
  modal_documents: [],
  lastChild: false,
  parentId: ''
}

const documentReducer = (state: StateInterface = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CREATE_FOLDER:
      return {
        ...state,
        value: action.payLoad
      }
    case actionTypes.RENAME_FOLDER:
      return {
        ...state,
        value: action.payLoad
      }
    case actionTypes.SET_DOCUMENTS:
      return {
        ...state,
        documents: action.payload
      }
    case actionTypes.SET_MODAL_DOCUMENTS:
      return {
        ...state,
        modal_documents: action.data
      }
    case actionTypes.SET_LAST_CHILD:
      return {
        ...state,
        lastChild: action.lastChild
      }
    case actionTypes.SET_RESPONSE:
      return {
        ...state,
        response: action.payload
      }
    case actionTypes.SET_TEMP_DOCUMENTS:
      return {
        ...state,
        temp_documents: action.payload
      }
    case actionTypes.SET_PARENT_ID:
      return {
        ...state,
        parentId: action.payload
      }
    default:
      return state
  }
}

export default documentReducer
