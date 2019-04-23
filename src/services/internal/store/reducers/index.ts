import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import authReducer from './authReducer'

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer
})
