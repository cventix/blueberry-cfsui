import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import authReducer from './authReducer'
import documentReducer from './documentReducer'
import selectReducer from './selectReducer'
import routerReducer from './routerReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  document: documentReducer,
  selection: selectReducer,
  router: routerReducer
})
