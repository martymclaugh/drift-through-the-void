export const types = {
  SET_HACK_NUMBER: 'SET_HACK_NUMBER',
  SET_TERMINALS: 'SET_TERMINALS',
}

export const setHackNumber = payload =>
  ({ type: types.SET_HACK_NUMBER, payload });
export const setTerminals = payload =>
  ({ type: types.SET_TERMINALS, payload });
