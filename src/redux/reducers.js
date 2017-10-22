import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import headQuartersReducer from '../components/HeadQuarters/head-quarters-reducer';

export default combineReducers({
  headQuarters: headQuartersReducer,
});
