import { Map, fromJS } from 'immutable';
import { types } from './game-screen-actions';
import { gamePhases } from '../../helpers/game-phases';

const INITIAL_STATE = fromJS({
  isPrivate: false,
  numberOfPlayers: 2,
  playersJoined: 0,
  server: '',
  users: Map(),
  gameStarted: false,
  activePlayer: '',
  phase: gamePhases.POPULATE_PLANETS,
});

const gameScreenReducer = (state = INITIAL_STATE, action) => {
  const activePlayer = state.get('activePlayer');
  const player = state.getIn(['users', `${activePlayer}`]);

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
    case types.CHANGE_PHASE:
      const gamePhasesArr = Object.keys(gamePhases);
      const index = (gamePhasesArr.indexOf(state.get('phase')) + 1) % gamePhasesArr.length;
      const nextPhase = gamePhases[gamePhasesArr[index]];
      return state.merge({ phase: nextPhase });
    case types.UPDATE_CARGO:
      return state.setIn(['users', `${state.get('activePlayer')}`, 'resources'], fromJS(action.payload));
    case types.START_GAME:
      return state.merge({
        gameStarted: true,
        activePlayer: state.get('users').keySeq().first(),
      });
    case types.COLONIZE_PLANET:
      return state.mergeDeep({
        users: {
          [`${state.get('activePlayer')}`]: {
            resources: {
              colonists: player.getIn(['resources', 'colonists']) - 1,
            },
            planets: {
              [action.payload.name]: {
                requiredColonists: player.getIn(['planets', action.payload.name, 'requiredColonists']) - 1,
              },
            },
          },
        },
      });
    case types.COLONIZE_MONUMENT:
      return state.mergeDeep({
        users: {
          [`${state.get('activePlayer')}`]: {
            resources: {
              colonists: player.getIn(['resources', 'colonists']) - 1,
            },
            monuments: {
              [action.payload.name]: {
                requiredColonists: player.getIn(['monuments', action.payload.name, 'requiredColonists']) - 1,
              },
            },
          },
        },
      });
    default:
      return state;
  }
};

export default gameScreenReducer;
