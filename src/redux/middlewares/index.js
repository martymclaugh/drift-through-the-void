import { loggerMiddleware } from './logger-middleware';
import { socketMiddleware } from '../game';

const middlewares = [
  loggerMiddleware,
  socketMiddleware,
];

export default middlewares;
