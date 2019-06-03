import { actionTypes } from './types'
import { actionBuilder } from './actionBuilder'

export const selectOs = actionBuilder(actionTypes.SELECT_OS, 'payload')
export const stepForward = actionBuilder(actionTypes.STEP_FORWARD, 'payload')
export const stepBackward = actionBuilder(actionTypes.STEP_BACKWARD, 'payload')