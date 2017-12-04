import { fromJS } from 'immutable';
import { types } from './home-screen-actions';

const INITIAL_STATE = fromJS({
  username: '',
  id: 0,
  inServer: false,
  error: ''
});


const homeScreenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE_USERNAME:
      return state.merge(action.payload);
    case types.USERNAME_TAKEN:
      return state.merge({ error: 'user name exists' });
    case types.USERNAME_SUCCESS:
      return state.merge({
        username: action.payload.username,
        id: action.payload.id,
        inServer: true,
        error: '',
      });
    default:
      return state;
  }
};

export default homeScreenReducer;
