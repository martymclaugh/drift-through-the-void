import { List } from 'immutable';
import { GameDetailsType } from '../shared/game-type';

export type Props = {
  server: Map<string, *>,
  games: List<GameDetailsType>,
  title: string,
  requestServer: () => void,
  recycleServer: (server: string) => void,
  clearError: () => void,
  joinGame: () => void,
};

export type State = {
  showGameForm: boolean,
  activeGame: ?GameDetailsType,
  showGameDetails: boolean,
}
