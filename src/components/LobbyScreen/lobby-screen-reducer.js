import { fromJS, List } from 'immutable';
import { types } from './lobby-screen-actions';

const INITIAL_STATE = fromJS({
  messages: List(),
});


const lobbyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_LOBBY_MESSAGE:
      const newState = state.get('messages').concat(action.payload);
      return state.merge({ messages: newState });
    default:
      return state;
  }
};

export default lobbyReducer;
