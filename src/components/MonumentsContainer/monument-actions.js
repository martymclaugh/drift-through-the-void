export const monumentTypes = {
  COLONIZE_MONUMENT: 'COLONIZE_MONUMENT',
};

export const colonizeMonument = payload =>
  ({ type: monumentTypes.COLONIZE_MONUMENT, payload });
