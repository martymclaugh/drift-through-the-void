export const planetActionTypes = {
  COLONIZE_PLANET: 'COLONIZE_PLANET',
};

export const colonizePlanet = payload =>
  ({ type: planetActionTypes.COLONIZE_PLANET, payload });
