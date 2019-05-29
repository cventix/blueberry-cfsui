import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  item: [],
  image: 'medium',
  downloadToken:[]
}

const selectReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SIDEBAR_ITEM:
      return {
        ...state,
        item: action.payload
      }
    case actionTypes.SET_PREVIEW_IMAGE:
      return {
        ...state,
        image: action.payload
      }
      case actionTypes.SET_DOWNLOAD_TOKEN:
        return {
          ...state,
          downloadToken: action.payload
        }
      
    default:
      return state
  }
}

export default selectReducer
