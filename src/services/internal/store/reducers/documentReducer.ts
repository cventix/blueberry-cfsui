import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  documents: []
}

const documentReducer = (state: any = initialState, action: any) => {
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
    case actionTypes.SET_RESPONSE:
      return {
        ...state,
        response: action.payload
      }
    default:
      return state
  }
}

export default documentReducer
