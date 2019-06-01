import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  selection: [],
  toggle: [false, false]
}

const selectReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_SELECTIONS:
      return Object.assign(
        {},
        state,

        { selection: action.payload }
      )
    case actionTypes.SET_TOGGLE:
      return {
        ...state,
        toggle: action.payload
      }
      case actionTypes.REMOVE_SELECTION:
          return {
            ...state,
            selection: []
          }
          
      
    default:
      return state
  }
}

export default selectReducer
