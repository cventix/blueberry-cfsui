import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import authReducer from './authReducer'
import documentReducer from './documentReducer'
import selectReducer from './selectReducer'
import routerReducer from './routerReducer';
import sidebarReducer from './sidebarReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  document: documentReducer,
  selection: selectReducer,
  router: routerReducer,
  sidebar: sidebarReducer,
  history: historyReducer
})
