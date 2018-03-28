import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import headQuartersReducer from '../components/HeadQuarters/head-quarters-reducer';
import gameScreenReducer from '../components/GameScreen/game-screen-reducer';
import homeScreenReducer from '../components/HomeScreen/home-screen-reducer';
import lobbyReducer from '../components/LobbyScreen/lobby-screen-reducer';
// import planetReducer from '../components/PlanetContainer/planet-reducer'
import upgradesReducer from '../components/Upgrades/upgrades-reducer';

export default combineReducers({
  headQuarters: headQuartersReducer,
  gameScreen: gameScreenReducer,
  homeScreen: homeScreenReducer,
  lobby: lobbyReducer,
  // planets: planetReducer,
  upgrades: upgradesReducer,
});
