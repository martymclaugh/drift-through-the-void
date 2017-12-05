export const types = {
  SEND_HACK_NUMBER: 'SEND_HACK_NUMBER',
  SEND_TERMINALS: 'SEND_TERMINALS',
  SEND_CARGO: 'SEND_CARGO',
  CREATE_USERNAME: 'CREATE_USERNAME',
  SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
  REQUEST_SERVER: 'REQUEST_SERVER',
  RECYCLE_SERVER: 'RECYCLE_SERVER',
  CREATE_GAME: 'CREATE_GAME',
  CHECK_PASSWORD: 'CHECK_PASSWORD',
}

export const sendHackNumber = payload =>
  ({ type: types.SEND_HACK_NUMBER, payload });
export const sendTerminals = payload =>
  ({ type: types.SEND_TERMINALS, payload });
export const sendCargo = payload =>
  ({ type: types.SEND_CARGO, payload });
export const requestServer = payload =>
  ({ type: types.REQUEST_SERVER, payload });
export const recycleServer = payload =>
  ({ type: types.RECYCLE_SERVER, payload });
export const createGame = payload =>
  ({ type: types.CREATE_GAME, payload });
export const checkPassword = payload =>
  ({ type: types.CHECK_PASSWORD, payload });
