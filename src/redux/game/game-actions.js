export const lobbyTypes = {
  SEND_HACK_NUMBER: 'SEND_HACK_NUMBER',
  SEND_TERMINALS: 'SEND_TERMINALS',
  SEND_CARGO: 'SEND_CARGO',
  CREATE_USERNAME: 'CREATE_USERNAME',
  SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
  REQUEST_SERVER: 'REQUEST_SERVER',
  RECYCLE_SERVER: 'RECYCLE_SERVER',
  CREATE_GAME: 'CREATE_GAME',
  CHECK_PASSWORD: 'CHECK_PASSWORD',
  JOIN_LOBBY_ROOM: 'JOIN_LOBBY_ROOM',
  LEAVE_LOBBY_ROOM: 'LEAVE_LOBBY_ROOM',
}

export const sendHackNumber = payload =>
  ({ type: lobbyTypes.SEND_HACK_NUMBER, payload });
export const sendTerminals = payload =>
  ({ type: lobbyTypes.SEND_TERMINALS, payload });
export const sendCargo = payload =>
  ({ type: lobbyTypes.SEND_CARGO, payload });
export const requestServer = payload =>
  ({ type: lobbyTypes.REQUEST_SERVER, payload });
export const recycleServer = payload =>
  ({ type: lobbyTypes.RECYCLE_SERVER, payload });
export const createGame = payload =>
  ({ type: lobbyTypes.CREATE_GAME, payload });
export const checkPassword = payload =>
  ({ type: lobbyTypes.CHECK_PASSWORD, payload });
export const joinLobbyRoom = () =>
  ({ type: lobbyTypes.JOIN_LOBBY_ROOM });
export const leaveLobbyRoom = () =>
  ({ type: lobbyTypes.LEAVE_LOBBY_ROOM });
