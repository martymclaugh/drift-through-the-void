import { createStore, applyMiddleware } from 'redux';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
// import rootSaga from './sagas';
// import { routerMiddleware } from 'react-router-redux'
// import createHistory from 'history/createBrowserHistory'

const middlewares = [];
// move into separate file if add more middlewares
if (process.env.NODE_ENV === `development`) {
  const stateTransformer = (state) => {
    const newState = {};
    Object.keys(state).forEach((i) => {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    });

    return newState;
  };

  const loggerMiddleware = createLogger({
    stateTransformer,
  });

  middlewares.push(loggerMiddleware);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

// sagaMiddleware.run(rootSaga);

export default store;
