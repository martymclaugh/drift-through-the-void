export const types = {
  SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
  ADD_LOBBY_MESSAGE: 'ADD_LOBBY_MESSAGE',
};

export const submitLobbyMessage = payload =>
  ({ type: types.SEND_LOBBY_MESSAGE, payload });
export const addLobbyMessage = payload =>
  ({ type: types.ADD_LOBBY_MESSAGE, payload });
