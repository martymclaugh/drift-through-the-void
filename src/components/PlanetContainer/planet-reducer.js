import { fromJS, List, Map } from 'immutable';
import { planetActionTypes } from './planet-actions';

const INITIAL_STATE = fromJS({
  planetOne: {
    requiredColonists: 0,
  },
  planetTwo: {
    requiredColonists: 0,
  },
  planetThree: {
    requiredColonists: 0,
  },
  planetFour: {
    requiredColonists: 3,
  },
  planetFive: {
    requiredColonists: 4,
  },
  planetSix: {
    requiredColonists: 5,
  },
  planetSeven: {
    requiredColonists: 6,
  },
});


const planetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case planetActionTypes.COLONIZE_PLANET:
      return state.setIn([action.payload, 'requiredColonists'], state.getIn([action.payload, 'requiredColonists']) - 1);
    default:
      return state;
  }
};

export default planetReducer;
