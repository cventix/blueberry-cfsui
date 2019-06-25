import { actionTypes } from '../actions/types'

// Interfaces
interface StateInterface {
  os: string
  currentStep: number
}

export const initialState: StateInterface = {
  os: '',
  currentStep: 0,
}

const goToNextStep = () => ({type: 'STEP_FORWARD'})

const goToPreviousStep = () => ({type: 'STEP_BACKWARD'})

const vmReducer = (state: any = initialState, action: any) => {
console.log(action.type)
  switch (action.type) {
    case actionTypes.SELECT_OS:
      return {
        ...state,
        os: action.payload
      }
    case actionTypes.STEP_FORWARD:
      return {
        ...state,
        currentStep: state.currentStep + 1
      }
    case actionTypes.STEP_BACKWARD:
      return {
        ...state,
        currentStep: state.currentStep - 1
      }
    default:
      return state
  }
}

export default vmReducer

