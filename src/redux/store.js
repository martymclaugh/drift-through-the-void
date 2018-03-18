import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import middlewares from './middlewares';
import { initiateSocketConnection } from './middlewares/socket';
// import rootSaga from './sagas';
// import { routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

initiateSocketConnection(store);

// sagaMiddleware.run(rootSaga);

export default store;
