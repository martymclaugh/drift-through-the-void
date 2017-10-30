import { setHackNumber, setTerminals } from '../../components/HeadQuarters/head-quarters-actions';
import { updateCargo } from '../../components/PlayerBoard/player-board-actions';

export const socketEventTypes = {
  receiveTerminals: setTerminals,
  receiveHackNumber: setHackNumber,
  receiveCargo: updateCargo,
}
