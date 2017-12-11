import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import headQuartersReducer from '../components/HeadQuarters/head-quarters-reducer';
import playerBoardReducer from '../components/PlayerBoard/player-board-reducer';
import homeScreenReducer from '../components/HomeScreen/home-screen-reducer';
import lobbyReducer from '../components/LobbyScreen/lobby-screen-reducer';
import planetReducer from '../components/PlanetContainer/planet-reducer'

export default combineReducers({
  headQuarters: headQuartersReducer,
  playerBoard: playerBoardReducer,
  homeScreen: homeScreenReducer,
  lobby: lobbyReducer,
  planets: planetReducer,
});
