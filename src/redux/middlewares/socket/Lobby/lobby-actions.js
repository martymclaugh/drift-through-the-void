export const lobbyActionTypes = {
  CREATE_USERNAME: 'CREATE_USERNAME',
  SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
  REQUEST_SERVER: 'REQUEST_SERVER',
  RECYCLE_SERVER: 'RECYCLE_SERVER',
  CREATE_GAME: 'CREATE_GAME',
  JOIN_GAME: 'JOIN_GAME',
  CHECK_PASSWORD: 'CHECK_PASSWORD',
  JOIN_LOBBY_ROOM: 'JOIN_LOBBY_ROOM',
  LEAVE_LOBBY_ROOM: 'LEAVE_LOBBY_ROOM',
  START_TYPING: 'START_TYPING',
  STOP_TYPING: 'STOP_TYPING',
}

export const requestServer = payload =>
  ({ type: lobbyActionTypes.REQUEST_SERVER, payload });
export const recycleServer = payload =>
  ({ type: lobbyActionTypes.RECYCLE_SERVER, payload });
export const createGame = payload =>
  ({ type: lobbyActionTypes.CREATE_GAME, payload });
export const joinGame = payload =>
  ({ type: lobbyActionTypes.JOIN_GAME, payload });
export const checkPassword = payload =>
  ({ type: lobbyActionTypes.CHECK_PASSWORD, payload });
export const joinLobbyRoom = () =>
  ({ type: lobbyActionTypes.JOIN_LOBBY_ROOM });
export const leaveLobbyRoom = () =>
  ({ type: lobbyActionTypes.LEAVE_LOBBY_ROOM });
export const startTyping = payload =>
  ({ type: lobbyActionTypes.START_TYPING, payload });
export const stopTyping = payload =>
  ({ type: lobbyActionTypes.STOP_TYPING, payload });
