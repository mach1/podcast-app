import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, compose(composeWithDevTools(applyMiddleware(sagaMiddleware))))

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', async () => {
    const newRootReducer = require('./rootReducer').default // eslint-disable-line @typescript-eslint/no-var-requires
    store.replaceReducer(newRootReducer)
  })
}

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export default store
