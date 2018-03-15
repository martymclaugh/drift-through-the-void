import { fromJS } from 'immutable';
import { types } from './game-screen-actions';
import { planetActionTypes } from '../PlanetContainer/planet-actions';

const INITIAL_STATE = fromJS({
  resources: {
    colonists: 0,
    soylent: 0,
    credits: 0,
    distributedResources: {
      nanoTubes: 0,
      unobtanium: 0,
      energyPlankton: 0,
      giantSpiderSilk: 0,
      rifles: 0,
    },
  },
  server: '',
  serverConfirmed: true,
});


const gameScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_CARGO:
    // TODO fix below
      return state.merge(action.payload);
    case planetActionTypes.COLONIZE_PLANET:
      return state.set('colonists', state.getIn(['resources', 'colonists']) - 1);
    case types.RECEIVE_SERVER_CONFIRMATION:
      console.log(action.payload);
      return state.merge(action.payload);
    default:
      return state;
  }
};

export default gameScreenReducer;
