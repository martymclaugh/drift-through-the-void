export const gameActionTypes = {
  SEND_HACK_NUMBER: 'SEND_HACK_NUMBER',
  SEND_TERMINALS: 'SEND_TERMINALS',
  SEND_CARGO: 'SEND_CARGO',
  CONFIRM_SERVER: 'CONFIRM_SERVER',
}

export const sendHackNumber = payload =>
  ({ type: gameActionTypes.SEND_HACK_NUMBER, payload });
export const sendTerminals = payload =>
  ({ type: gameActionTypes.SEND_TERMINALS, payload });
export const sendCargo = payload =>
  ({ type: gameActionTypes.SEND_CARGO, payload });
export const confirmServer = payload =>
  ({ type: gameActionTypes.CONFIRM_SERVER, payload });
