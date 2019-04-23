import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
// import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
// const middleware = [];
// middleware.push(createLogger());

export const store = createStore(reducers, undefined, composeWithDevTools(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga)

export default store
