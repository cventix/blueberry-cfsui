import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
    router: []
}

const routerReducer = (state: any = initialState, action: any) => {

  switch (action.type) {
    case actionTypes.SET_ROUTER:
      return {
        ...state,
        router: action.payload
      }
    default:
      return state
  }
}

export default routerReducer
