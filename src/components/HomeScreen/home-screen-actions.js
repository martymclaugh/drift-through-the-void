export const types = {
  CREATE_USERNAME: 'CREATE_USERNAME',
  USERNAME_TAKEN: 'USERNAME_TAKEN',
  USERNAME_SUCCESS: 'USERNAME_SUCCESS',
}

export const createUsername = payload =>
  ({ type: types.CREATE_USERNAME, payload });
export const usernameTaken = payload =>
  ({ type: types.USERNAME_TAKEN, payload });
export const usernameSuccess = payload =>
  ({ type: types.USERNAME_SUCCESS, payload });
