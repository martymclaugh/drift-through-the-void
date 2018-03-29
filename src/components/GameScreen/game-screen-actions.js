export const types = {
  UPDATE_CARGO: 'UPDATE_CARGO',
  PLAYER_JOINED: 'PLAYER_JOINED',
  START_GAME: 'START_GAME',
  CHANGE_PHASE: 'CHANGE_PHASE',
  COLONIZE_PLANET: 'COLONIZE_PLANET',
  COLONIZE_MONUMENT: 'COLONIZE_MONUMENT',
  PURCHASE_UPGRADE: 'PURCHASE_UPGRADE',
}

export const updateCargo = payload =>
  ({ type: types.UPDATE_CARGO, payload });
export const startGame = payload =>
  ({ type: types.START_GAME, payload });
export const playerJoined = payload =>
  ({ type: types.PLAYER_JOINED, payload });
export const changePhase = () =>
  ({ type: types.CHANGE_PHASE });
export const colonizePlanet = payload =>
  ({ type: types.COLONIZE_PLANET, payload });
export const colonizeMonument = payload =>
  ({ type: types.COLONIZE_MONUMENT, payload });
export const purchaseUpgrade = payload =>
  ({ type: types.PURCHASE_UPGRADE, payload });
