import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  editableForm: false,
  products: []
}

const accountReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_FORM_STATE:
      return {
        ...state,
        editableForm: action.payload
      }
      case actionTypes.SET_PRODUCTS:
        return {
          ...state,
          products: action.products
        }
    default:
      return state
  }
}

export default accountReducer
