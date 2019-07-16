import { actionTypes } from '../actions/types'

// Interfaces
interface StateInterface {
  isLoading: boolean
  modalLoading: boolean
  downloadLoading: boolean
}

interface ActionInterface {
  type: string
  isLoading?: boolean
  modalLoading?: boolean
  downloadLoading?: boolean
}

const initialState: StateInterface = {
  isLoading: false,
  modalLoading: false,
  downloadLoading: false
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
    case actionTypes.SET_DOWNLOAD_LOADING:
      return {
        downloadLoading: action.downloadLoading
      }

    default:
      return state
  }
}

export default loadingReducer
