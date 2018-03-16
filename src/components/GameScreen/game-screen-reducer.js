import { Map, fromJS } from 'immutable';
import { types } from './game-screen-actions';
import { planetActionTypes } from '../PlanetContainer/planet-actions';

const INITIAL_STATE = fromJS({
  isPrivate: false,
  numberOfPlayers: 2,
  playersJoined: 0,
  server: '',
  users: Map(),
  gameStarted: false,
  activePlayer: '',
});

const gameScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.PLAYER_JOINED:
      const {
        users,
        server,
        isPrivate,
        numberOfPlayers,
        playersJoined,
      } = action.payload.game;

      return state.merge({
        users,
        server,
        isPrivate,
        numberOfPlayers,
        playersJoined,
      });
    case types.UPDATE_CARGO:
      return state.setIn(['users', `${state.get('activePlayer')}`], fromJS({ resources: action.payload }));
    case types.START_GAME:
      return state.merge({
        gameStarted: true,
        activePlayer: state.get('users').keySeq().first(),
      });
    case planetActionTypes.COLONIZE_PLANET:
      return state.set('colonists', state.getIn(['resources', 'colonists']) - 1);
    default:
      return state;
  }
};

export default gameScreenReducer;
