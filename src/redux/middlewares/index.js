import { loggerMiddleware } from './logger-middleware';
import { gameMiddleware } from './socket/Game/game-middleware';
import { lobbyMiddleware } from './socket/Lobby/lobby-middleware';

const middlewares = [
  loggerMiddleware,
  gameMiddleware,
  lobbyMiddleware,
];

export default middlewares;
