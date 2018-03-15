export const types = {
  UPDATE_CARGO: 'UPDATE_CARGO',
  RECEIVE_SERVER_CONFIRMATION: 'RECEIVE_SERVER_CONFIRMATION',
}

export const updateCargo = payload =>
  ({ type: types.UPDATE_CARGO, payload })
export const receiveServerConfirmation = payload =>
  ({ type: types.RECEIVE_SERVER_CONFIRMATION, payload });
