import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger';

let loggerMiddleware;
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

  loggerMiddleware = createLogger({
    stateTransformer,
  });
}

export { loggerMiddleware };
