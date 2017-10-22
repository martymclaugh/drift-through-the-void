import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import headQuartersReducer from '../components/HeadQuarters/head-quarters-reducer';
import playerBoardReducer from '../components/PlayerBoard/player-board-reducer';

export default combineReducers({
  headQuarters: headQuartersReducer,
  playerBoard: playerBoardReducer,
});
