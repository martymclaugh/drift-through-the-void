import io from 'socket.io-client';
import { lobbyActionTypes } from './lobby-actions';
import { gameActionTypes } from './game-actions';
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
    if (socket && action.type) {
      switch (action.type) {
        case lobbyActionTypes.CREATE_USERNAME:
          socket.emit('createUsername', data);
          break;
        case lobbyActionTypes.SEND_LOBBY_MESSAGE:
          socket.emit('sendLobbyMessage', data);
          break;
        case lobbyActionTypes.RECYCLE_SERVER:
          socket.emit('recycleServer', data);
          break;
        case lobbyActionTypes.REQUEST_SERVER:
          socket.emit('requestServer', data);
          break;
        case lobbyActionTypes.CREATE_GAME:
          socket.emit('createGame', data);
          break;
        case lobbyActionTypes.CHECK_PASSWORD:
          socket.emit('checkPassword', data);
          break;
        case lobbyActionTypes.JOIN_LOBBY_ROOM:
          socket.emit('joinLobbyRoom');
          break;
        case lobbyActionTypes.LEAVE_LOBBY_ROOM:
          socket.emit('leaveLobbyRoom');
          break;
        case lobbyActionTypes.START_TYPING:
          socket.emit('sendUserTyping', data);
          break;
        case lobbyActionTypes.STOP_TYPING:
          socket.emit('removeUserTyping', data);
          break;
        case lobbyActionTypes.JOIN_GAME:
          socket.emit('joinGame', data);
          break;
        case gameActionTypes.SEND_TERMINALS:
          socket.emit('sendTerminals', data);
          break;
        case gameActionTypes.SEND_HACK_NUMBER:
          socket.emit('sendHackNumber', data);
          break;
        case gameActionTypes.SEND_CARGO:
          socket.emit('sendCargo', data);
          break;
        case gameActionTypes.CONFIRM_SERVER:
          socket.emit('confirmServer', data);
          break;
        default:
          return next(action);
      }
    }

    return next(action);
  };
}

export const startGame = (store) => {
  Object.keys(socketEventTypes).map(action => { // eslint-disable-line array-callback-return
    socket.on(action, data => {
      data && store.dispatch(socketEventTypes[action](data));
    });
  });
}
