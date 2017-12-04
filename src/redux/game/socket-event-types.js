import { setHackNumber, setTerminals } from '../../components/HeadQuarters/head-quarters-actions';
import { updateCargo } from '../../components/PlayerBoard/player-board-actions';
import { usernameTaken, usernameSuccess } from '../../components/HomeScreen/home-screen-actions';
import { addLobbyMessage } from '../../components/LobbyScreen/lobby-screen-actions';

export const socketEventTypes = {
  receiveTerminals: setTerminals,
  receiveHackNumber: setHackNumber,
  receiveCargo: updateCargo,
  receiveUsernameTaken: usernameTaken,
  receiveUsernameSuccess: usernameSuccess,
  receiveLobbyMessage: addLobbyMessage,
}
