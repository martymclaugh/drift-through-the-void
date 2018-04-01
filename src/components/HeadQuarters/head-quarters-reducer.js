import { fromJS, List } from 'immutable';
import { types } from './head-quarters-actions';
import { types as gameScreenTypes } from '../GameScreen/game-screen-actions';

const INITIAL_STATE = fromJS({
  numberOfHacks: 3,
  terminals: List(),
});


const headQuartersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_HACK_NUMBER:
      return state.merge(action.payload);
    case types.SET_TERMINALS:
      return state.merge({
        terminals: List(action.payload.terminals)
      });
    case gameScreenTypes.CHANGE_PHASE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default headQuartersReducer;
