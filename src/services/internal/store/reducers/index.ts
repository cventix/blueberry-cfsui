import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import authReducer from './authReducer'
import documentReducer from './documentReducer'

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  document: documentReducer
})
