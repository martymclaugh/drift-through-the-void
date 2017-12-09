import { List } from 'immutable';
import { MessageType } from '../shared/message-type';

export type Props = {
  username: string,
  messages: List<MessageType>,
  submitLobbyMessage: (messagge: MessageType) => void,
  addLobbyMessage: (message: MessageType) => void,
  joinLobbyRoom: () => void,
  leaveLobbyRoom: () => void,
  history: any,
};

export type State = {
  message: string,
};
