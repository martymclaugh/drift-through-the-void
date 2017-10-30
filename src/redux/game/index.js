import io from 'socket.io-client';
import { toJS, Iterable, fromJS } from 'immutable';
import { setHackNumber, setTerminals } from '../../components/HeadQuarters/head-quarters-actions';
import { updateCargo } from '../../components/PlayerBoard/player-board-actions';
import { types } from './game-actions';
import { socketEventTypes } from './socket-event-types';

var config = {};
// move to separate config file
if (process.env.NODE_ENV === 'development') {
  config.port = 3000;
  config.host = 'localhost';
}

const socket = io.connect(`http://${config.host}:${config.port}`);

export const socketMiddleware = (store) => {
  return next => action => {
    const data = action.payload
    if (socket && action.type && data) {
      switch (action.type) {
        case types.SEND_TERMINALS:
          socket.emit('sendTerminals', data);
          break;
        case types.SEND_HACK_NUMBER:
          socket.emit('sendHackNumber', data);
        case types.SEND_CARGO:
          socket.emit('sendCargo', data);
        default:
          console.log('strange action', action);
      }
    }

    return next(action);
  };
}

export const startGame = (store) => {
  Object.keys(socketEventTypes).map(action => {
    socket.on(action, data => {
      data && store.dispatch(socketEventTypes[action](data));
    });
  });
}