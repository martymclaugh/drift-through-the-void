import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './reducers';
// import rootSaga from './sagas';
// import { routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'
const middlewares = [
  logger,
]
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

// sagaMiddleware.run(rootSaga);

export default store;
