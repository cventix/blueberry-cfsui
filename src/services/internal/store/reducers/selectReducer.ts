import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}
export interface StateInterface {
  selection?: Array<number>
  toggle?: Array<boolean>
  modalSelect?: Array<number>
  fullScreen: boolean
}

export const initialState: StateInterface = {
  selection: [],
  toggle: [false, false],
  modalSelect: [],
  fullScreen: false
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
    case actionTypes.SET_FULLSCREEN:
      return {
        ...state,
        fullScreen: action.payload
      }
    case actionTypes.SET_MODAL_SELECTIONS:
      return {
        ...state,
        modalSelect: action.payload
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
