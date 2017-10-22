export const types = {
  UPDATE_STORAGE: 'UPDATE_STORAGE',
}

export const updateStorage = payload =>
  ({ type: types.UPDATE_STORAGE, payload })
