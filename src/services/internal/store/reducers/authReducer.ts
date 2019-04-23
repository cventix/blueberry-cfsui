import { actionTypes } from '../actions/types'

// Interfaces
export interface StateInterface {
  token: string
  username: string
}

export interface PayloadInterface {
  token?: string
  username?: string
}

export interface ActionInterface {
  type: string
  payload: PayloadInterface
}

export const initialState: StateInterface = {
  token: '',
  username: ''
}

const authReducer = (state: StateInterface = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      }
    case actionTypes.SET_USER_CREDENTIALS:
      return {
        ...state,
        username: action.payload.username
      }
    case actionTypes.SIGNOUT:
      return {
        ...state,
        token: '',
        username: ''
      }
    default:
      return state
  }
}

export default authReducer
