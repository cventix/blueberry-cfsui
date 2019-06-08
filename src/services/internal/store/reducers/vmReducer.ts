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

const goToNextStep = (stepNumbers: number[], state: any) => {
  state.currentStep = state.currentStep + 1;
  return state.currentStep
}

const goToPreviousStep = (stepNumbers: number[], state: any) => {
  state.currentStep = state.currentStep - 1;
  return state.currentStep
}

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
        currentStep: goToNextStep(action.payload, state)
      }
    case actionTypes.STEP_BACKWARD:
      return {
        ...state,
        currentStep: goToPreviousStep(action.payload, state)
      }
    default:
      return state
  }
}

export default vmReducer

