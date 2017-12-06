import { fromJS, List, Map } from 'immutable';
import { types } from './lobby-screen-actions';

const INITIAL_STATE = fromJS({
  messages: List(),
  games: List(),
  server: Map(),
  error: '',
  passwordVerified: false,
});


const lobbyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_LOBBY_MESSAGE:
      const newMessagesState = state.get('messages').concat(action.payload);
      return state.merge({
        messages: newMessagesState,
        error: '',
      });
    case types.RECEIVE_SERVER:
      return state.merge({
        server: {
          name: action.payload,
        },
        error: '',
      });
    case types.ADD_LOBBY_GAME:
      const newGameState = state.get('games').concat(action.payload);
      return state.merge({
        games: newGameState,
        error: '',
      });
    case types.WRONG_PASSWORD:
      return state.merge({ error: action.payload.error });
    case types.PASSWORD_SUCCESS:
      return state.merge({ passwordVerified: true });
    case types.CLEAR_ERROR:
      return state.merge({ error: '' });
    default:
      return state;
  }
};

export default lobbyReducer;
