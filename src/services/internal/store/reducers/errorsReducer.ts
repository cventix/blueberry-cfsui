import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
    errors: []
}

const routerReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case actionTypes.SET_ERROR:
      return {
        ...state,
        errors: action.payload
      }
    default:
      return state
  }
}

export default routerReducer
