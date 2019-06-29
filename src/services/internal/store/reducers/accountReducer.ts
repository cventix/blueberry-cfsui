import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  editableForm: false,
  msgs: []
}

const accountReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_FORM_STATE:
      return {
        ...state,
        editableForm: action.payload
      }

    default:
      return state
  }
}

export default accountReducer
