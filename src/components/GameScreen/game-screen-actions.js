export const types = {
  UPDATE_CARGO: 'UPDATE_CARGO',
  PLAYER_JOINED: 'PLAYER_JOINED',
  START_GAME: 'START_GAME',
}

export const updateCargo = payload =>
  ({ type: types.UPDATE_CARGO, payload });
export const startGame = payload =>
  ({ type: types.START_GAME, payload });
export const playerJoined = payload =>
  ({ type: types.PLAYER_JOINED, payload });
