import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const selectOs = actionBuilder(actionTypes.SELECT_OS, 'payload')
export const goToNextStep = actionBuilder(actionTypes.STEP_FORWARD, 'payload')
export const goToPreviousStep = actionBuilder(actionTypes.STEP_BACKWARD, 'payload')