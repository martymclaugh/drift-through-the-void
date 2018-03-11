import io from 'socket.io-client';
import { lobbyTypes } from './game-actions';
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
        case lobbyTypes.SEND_TERMINALS:
          socket.emit('sendTerminals', data);
          break;
        case lobbyTypes.SEND_HACK_NUMBER:
          socket.emit('sendHackNumber', data);
          break;
        case lobbyTypes.SEND_CARGO:
          socket.emit('sendCargo', data);
          break;
        case lobbyTypes.CREATE_USERNAME:
          socket.emit('createUsername', data);
          break;
        case lobbyTypes.SEND_LOBBY_MESSAGE:
          socket.emit('sendLobbyMessage', data);
          break;
        case lobbyTypes.RECYCLE_SERVER:
          socket.emit('recycleServer', data);
          break;
        case lobbyTypes.REQUEST_SERVER:
          socket.emit('requestServer', data);
          break;
        case lobbyTypes.CREATE_GAME:
          socket.emit('createGame', data);
          break;
        case lobbyTypes.CHECK_PASSWORD:
          socket.emit('checkPassword', data);
          break;
        case lobbyTypes.JOIN_LOBBY_ROOM:
          socket.emit('joinLobbyRoom');
          break;
        case lobbyTypes.LEAVE_LOBBY_ROOM:
          socket.emit('leaveLobbyRoom');
          break;
        case lobbyTypes.START_TYPING:
          socket.emit('sendUserTyping', data);
          break;
        case lobbyTypes.STOP_TYPING:
          socket.emit('removeUserTyping', data);
          break;
        case lobbyTypes.JOIN_GAME:
          socket.emit('joinGame', data);
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
