import io from 'socket.io-client';

let config = {};

if (process.env.NODE_ENV === 'development') {
  config.port = 3000;
  config.host = 'localhost';
}

export const socket = io.connect(`http://${config.host}:${config.port}`);
