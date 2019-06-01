import { actionTypes } from '../actions/types'

export interface StateInterface {
  documents?: any[]
  tem_doucuments: any[]
  modal_documents?: any[]
  value?: any[]
  response?: any[]
}

export interface PayloadInterface {
  documents?: any[]
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
  modal_documents: []
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
        modal_documents: action.payload
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
    default:
      return state
  }
}

export default documentReducer
