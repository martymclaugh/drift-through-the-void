import { fromJS, List, Map } from 'immutable';
import { types } from './lobby-screen-actions';
import { lobbyActionTypes } from '../../redux/middlewares/socket/Lobby/lobby-actions';

const INITIAL_STATE = fromJS({
  messages: List(),
  games: Map(),
  server: '',
  error: '',
  passwordVerified: false,
  usersTyping: List(),
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
    case lobbyActionTypes.CREATE_GAME:
      const { game } = action.payload;
      const newGameState = state.get('games').set(game.server, game);

      return state.merge({
        games: newGameState,
        error: '',
      });
    case lobbyActionTypes.JOIN_LOBBY_ROOM:
      return state.merge({
        games: Map(),
        messages: List(),
        passwordVerified: false,
      });
    case types.WRONG_PASSWORD:
      return state.merge({ error: action.payload.error });
    case types.PASSWORD_SUCCESS:
      return state.merge({ passwordVerified: true });
    case types.CLEAR_ERROR:
      return state.merge({ error: '' });
    case types.UPDATE_GAMES_LIST:
      return state.merge({
        games: action.payload,
      });
    case types.UPDATE_USERS_TYPING:
      return state.set('usersTyping', List(action.payload));
    default:
      return state;
  }
};

export default lobbyReducer;
