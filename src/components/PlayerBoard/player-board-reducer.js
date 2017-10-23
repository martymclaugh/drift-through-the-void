import { fromJS, List } from 'immutable';
import { types } from './player-board-actions';

const INITIAL_STATE = fromJS({
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
});


const playerBoardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_STORAGE:
      return state.merge(action.payload);
    default:
      return state;
  }
};

export default playerBoardReducer;
