import { setHackNumber, setTerminals } from '../../components/HeadQuarters/head-quarters-actions';
import { updateCargo } from '../../components/GameScreen/game-screen-actions';
import { usernameTaken, usernameSuccess } from '../../components/HomeScreen/home-screen-actions';
import {
  addLobbyMessage,
  receiveServer,
  addLobbyGame,
  wrongPassword,
  passwordSuccess,
  updateGamesList,
  updateUsersTyping,
} from '../../components/LobbyScreen/lobby-screen-actions';
import { receiveServerConfirmation } from '../../components/GameScreen/game-screen-actions';

export const socketEventTypes = {
  receiveTerminals: setTerminals,
  receiveHackNumber: setHackNumber,
  receiveCargo: updateCargo,
  receiveUsernameTaken: usernameTaken,
  receiveUsernameSuccess: usernameSuccess,
  receiveLobbyMessage: addLobbyMessage,
  receiveServer: receiveServer,
  receiveLobbyGame: addLobbyGame,
  wrongPassword,
  passwordSuccess,
  updateGamesList,
  receiveLobbyActivelyTyping: updateUsersTyping,
  serverConfirmation: receiveServerConfirmation,
}
