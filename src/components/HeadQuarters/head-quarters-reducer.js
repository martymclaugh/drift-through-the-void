import { fromJS, List } from 'immutable';
import { types } from './head-quarters-actions';

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
    default:
      return state;
  }
};

export default headQuartersReducer;
