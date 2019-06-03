import { actionTypes } from '../actions/types'

export interface PayloadInterface {
  data?: object[]
}

export const initialState: any = {
  selectedOs: '',
  steps:[]
}

const checkStep = (stepNumbers: number[], state: any) => {
  console.log(state)
  return 0 
}

const vmReducer = (state: any = initialState, action: any) => {
console.log(action.type)
  switch (action.type) {
    case actionTypes.SELECT_OS:
      return {
        ...state,
        selectedOs: action.payload
      }
    case actionTypes.STEP_FORWARD:
      return {
        ...state,
        steps: checkStep(action.payload, state)
      }
    case actionTypes.STEP_BACKWARD:
      return {
        ...state,
        steps: action.payload
      }
    default:
      return state
  }
}

export default vmReducer

