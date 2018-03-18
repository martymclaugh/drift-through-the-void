import { GameDetailsType, GameType } from '../shared/game-type';

export type Props = {
  activeGame: GameDetailsType,
  gameDetails: GameDetailsType,
  username: string,
  error: string,
  passwordVerified: boolean,
  server: string,
  requestServer: () => void,
  recycleServer: () => void,
  createGame: ({ game: GameType }) => void,
  checkPassword: ({ game: GameType }) => void,
  joinGame: (server: string) => void,
};

export type State = {
  password: string,
  isPrivate: boolean,
};
