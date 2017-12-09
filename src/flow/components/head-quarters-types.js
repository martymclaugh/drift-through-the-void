import { List } from 'immutable';
import { TerminalType } from '../shared/terminal-type';

export type State = {
  hackingActive: boolean,
  emptyTerminalIds: Array<number>,
}

export type Props = {
  numberOfHacks: number,
  terminalAmount: number,
  terminals: List<TerminalType>,
  setTerminals: (terminals: Array<TerminalType> | List<TerminalType>) => void,
  sendTerminals: (terminals: Array<TerminalType> | List<TerminalType>) => void,
  sendHackNumber: ({ numberOfHacks: number }) => void;
  updateCargo: () => void,
  setHackNumber: ({ numberOfHacks: number }) => void,
}
