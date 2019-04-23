import { actionTypes } from '../actions/types'

// Interfaces
interface StateInterface {
  isLoading: boolean
}

interface ActionInterface {
  type: string
  isLoading?: boolean
}

const initialState: StateInterface = {
  isLoading: false
}

const loadingReducer = (state: StateInterface = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_STATE:
      return {
        isLoading: action.isLoading
      }
    default:
      return state
  }
}

export default loadingReducer
