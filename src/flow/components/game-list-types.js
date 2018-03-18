import { List } from 'immutable';
import { GameDetailsType } from '../shared/game-type'

export type Props = {
  games: List<GameDetailsType>,
  handleGameClick: (game: GameDetailsType) => void;
};
