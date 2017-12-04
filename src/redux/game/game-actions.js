export const types = {
  SEND_HACK_NUMBER: 'SEND_HACK_NUMBER',
  SEND_TERMINALS: 'SEND_TERMINALS',
  SEND_CARGO: 'SEND_CARGO',
  CREATE_USERNAME: 'CREATE_USERNAME',
  SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
}

export const sendHackNumber = payload =>
  ({ type: types.SEND_HACK_NUMBER, payload });
export const sendTerminals = payload =>
  ({ type: types.SEND_TERMINALS, payload });
export const sendCargo = payload =>
  ({ type: types.SEND_CARGO, payload });
