import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  item: []
}

const selectReducer = (state: any = initialState, action: any) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.SET_SIDEBAR_ITEM:
      return {
        ...state,
        item: action.payload
      }
    default:
      return state
  }
}

export default selectReducer
