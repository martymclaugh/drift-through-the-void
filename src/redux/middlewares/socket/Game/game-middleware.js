import { socket } from '../socket.config';
import { gameActionTypes } from './game-actions';
import { types as gameScreenActions } from '../../../../components/GameScreen/game-screen-actions';

export const gameMiddleware = (store) => {
  return next => action => {
    const data = action.payload
    const state = store.getState()
    const withServer = obj => ({
      ...obj,
      server: state.gameScreen.get('server'),
    });
    const isActivePlayer = state.homeScreen.get('username') === state.gameScreen.get('activePlayer');

    if (socket && action.type && isActivePlayer) {
      switch (action.type) {
        case gameActionTypes.SEND_TERMINALS:
          socket.emit('sendTerminals', withServer(data));
          break;
        case gameActionTypes.SEND_HACK_NUMBER:
          socket.emit('sendHackNumber', withServer(data));
          break;
        case gameActionTypes.SEND_CARGO:
          socket.emit('sendCargo', withServer(data));
          break;
        case gameScreenActions.COLONIZE_PLANET:
          socket.emit('colonizePlanet', withServer(data));
          break;
        case gameScreenActions.CHANGE_PHASE:
          socket.emit('changePhase', withServer(data));
          break;
        default:
          return next(action);
      }
    }

    return next(action);
  };
}
