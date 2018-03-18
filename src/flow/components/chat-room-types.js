import { List } from 'immutable';
import { MessageType } from '../shared/message-type';

export type Props = {
  title: string,
  value: string,
  messages: List<MessageType>,
  onChange: () => void;
  submitMessage: () => void;
};

export type State = {
};
