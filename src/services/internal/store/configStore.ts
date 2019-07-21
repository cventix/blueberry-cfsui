import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()

const middleware = []
middleware.push(createLogger())
middleware.push(sagaMiddleware)

const store = createStore(reducers, undefined, composeWithDevTools(compose(applyMiddleware(...middleware))))

sagaMiddleware.run(rootSaga)

export default store
