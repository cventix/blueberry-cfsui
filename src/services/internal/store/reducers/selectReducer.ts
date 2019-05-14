import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  selection: []
}

const selectReducer = (state: any = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.SET_SELECTIONS:
      return {
        ...state,
        selection: action.payload
      }
    default:
      return state
  }
}

export default selectReducer
