import { setHackNumber, setTerminals } from '../../../components/HeadQuarters/head-quarters-actions';
import { usernameTaken, usernameSuccess } from '../../../components/HomeScreen/home-screen-actions';
import {
  addLobbyMessage,
  receiveServer,
  wrongPassword,
  passwordSuccess,
  updateGamesList,
  updateUsersTyping,
} from '../../../components/LobbyScreen/lobby-screen-actions';
import {
  updateCargo,
  changePhase,
  colonizePlanet,
  colonizeMonument,
} from '../../../components/GameScreen/game-screen-actions';
import { playerJoined } from '../../../components/GameScreen/game-screen-actions';

export const socketEventTypes = {
  receiveTerminals: setTerminals,
  receiveHackNumber: setHackNumber,
  receiveCargo: updateCargo,
  receiveUsernameTaken: usernameTaken,
  receiveLobbyActivelyTyping: updateUsersTyping,
  receiveUsernameSuccess: usernameSuccess,
  receiveLobbyMessage: addLobbyMessage,
  receiveServer: receiveServer,
  wrongPassword,
  passwordSuccess,
  updateGamesList,
  playerJoined,
  changePhase,
  colonizePlanet,
  colonizeMonument,
}
