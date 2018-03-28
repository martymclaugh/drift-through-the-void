import { socket } from '../socket.config';
import { gameActionTypes } from './game-actions';
import { types as gameScreenActions } from '../../../../components/GameScreen/game-screen-actions';
import { types as upgradeTypes } from '../../../../components/Upgrades/upgrades-actions';

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
      const payload = withServer(data);
      switch (action.type) {
        case gameActionTypes.SEND_TERMINALS:
          socket.emit('sendTerminals', payload);
          break;
        case gameActionTypes.SEND_HACK_NUMBER:
          socket.emit('sendHackNumber', payload);
          break;
        case gameActionTypes.SEND_CARGO:
          socket.emit('sendCargo', payload);
          break;
        case gameScreenActions.COLONIZE_PLANET:
          socket.emit('colonizePlanet', payload);
          break;
        case gameScreenActions.COLONIZE_MONUMENT:
          socket.emit('colonizeMonument', payload);
          break;
        case gameScreenActions.CHANGE_PHASE:
          socket.emit('changePhase', payload);
          break;
        case upgradeTypes.SELECT_UPGRADE:
          socket.emit('selectUpgrade', payload);
          break;
        case upgradeTypes.SELECT_RESOURCE:
          socket.emit('selectResource', payload);
          break;
        default:
          return next(action);
      }
    }

    return next(action);
  };
}
