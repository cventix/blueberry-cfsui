import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  history: []
}

const historyReducer = (state: any = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.SET_HISTORY:
      return {
        ...state,
        history: action.payload
      }
    default:
      return state
  }
}

export default historyReducer
