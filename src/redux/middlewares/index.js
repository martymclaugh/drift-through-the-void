import { loggerMiddleware } from './logger-middleware';
import { socketMiddleware } from '../socket';

const middlewares = [
  loggerMiddleware,
  socketMiddleware,
];

export default middlewares;
