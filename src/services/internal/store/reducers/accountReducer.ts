import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  editableForm: false,
  products: [],
  monthly: true
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
    case actionTypes.SET_PRODUCT_TOGGLE:
      return {
        ...state,
        monthly: action.payload
      }
    default:
      return state
  }
}

export default accountReducer
