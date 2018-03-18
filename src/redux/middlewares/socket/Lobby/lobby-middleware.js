import { socket } from '../socket.config';
import { lobbyActionTypes } from './lobby-actions';

export const lobbyMiddleware = (store) => {
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
        default:
          return next(action);
      }
    }

    return next(action);
  };
}
