export const types = {
  UPDATE_CARGO: 'UPDATE_CARGO',
}

export const updateCargo = payload =>
  ({ type: types.UPDATE_CARGO, payload })
