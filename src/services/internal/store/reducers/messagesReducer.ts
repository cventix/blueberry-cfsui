import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  errors: [],
  msgs: []
}

const messagesRouter = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        msgs: action.payload
      }
    case actionTypes.REMOVE_MESSAGES:
      return {
        ...state,
        msgs: [],
        errors: []
      }
    default:
      return state
  }
}

export default messagesRouter
