import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import actorsReducer from './actorsReducer';
import authReducer from './authReducer';

export default combineReducers({
  movies: movieReducer,
  actors: actorsReducer,
  auth: authReducer
});