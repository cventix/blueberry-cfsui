import { actionTypes } from '../actions/types'


// Interfaces
interface StateInterface {
  isLoading: boolean
  modalLoading: boolean
}

interface ActionInterface {
  type: string
  isLoading?: boolean
  modalLoading?: boolean
}

const initialState: StateInterface = {
  isLoading: false,
  modalLoading: false
}

const loadingReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.SET_LOADING_STATE:
      return {
        isLoading: action.isLoading
      }
    case actionTypes.SET_MODAL_LOADING_STATE:
      return {
        modalLoading: action.modalLoading
      }
    default:
      return state
  }
}

export default loadingReducer
