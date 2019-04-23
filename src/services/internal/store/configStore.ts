import reducers from './reducers'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = []
middleware.push(createLogger())

export const store = createStore(reducers, undefined, composeWithDevTools(applyMiddleware(...middleware)))

export default store
