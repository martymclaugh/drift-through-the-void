export const types = {
  SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
  ADD_LOBBY_MESSAGE: 'ADD_LOBBY_MESSAGE',
  RECEIVE_SERVER: 'RECEIVE_SERVER',
  ADD_LOBBY_GAME: 'ADD_LOBBY_GAME',
  WRONG_PASSWORD: 'WRONG_PASSWORD',
  PASSWORD_SUCCESS: 'PASSWORD_SUCCESS',
  CLEAR_ERROR: 'CLEAR_ERROR',
  UPDATE_GAMES_LIST: 'UPDATE_GAMES_LIST',
  UPDATE_USERS_TYPING: 'UPDATE_USERS_TYPING',
};

export const submitLobbyMessage = payload =>
  ({ type: types.SEND_LOBBY_MESSAGE, payload });
export const addLobbyMessage = payload =>
  ({ type: types.ADD_LOBBY_MESSAGE, payload });
export const receiveServer = payload =>
  ({ type: types.RECEIVE_SERVER, payload });
export const addLobbyGame = payload =>
  ({ type: types.ADD_LOBBY_GAME, payload });
export const wrongPassword = payload =>
  ({ type: types.WRONG_PASSWORD, payload });
export const passwordSuccess = payload =>
  ({ type: types.PASSWORD_SUCCESS, payload });
export const clearError = () =>
  ({ type: types.CLEAR_ERROR });
export const updateGamesList = (payload) =>
  ({ type: types.UPDATE_GAMES_LIST, payload });
export const updateUsersTyping = (payload) =>
  ({ type: types.UPDATE_USERS_TYPING, payload });
