import { socket } from './socket.config';
import { socketEventTypes } from './socket-event-types';

export const initiateSocketConnection = (store) => {
  Object.keys(socketEventTypes).map(action => { // eslint-disable-line array-callback-return
    socket.on(action, data => {
      data && store.dispatch(socketEventTypes[action](data));
    });
  });
}
